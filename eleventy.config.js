import elasticlunr from 'elasticlunr';
import fs from 'fs';
import path from 'path';
import fetch from "node-fetch";
import 'dotenv/config';

let allPlugins = [];
const isProd = process.env.ELEVENTY_ENV === "production";
const pathPrefix = isProd ? "/neoBeta/" : "/";
const buildTime = new Date(Date.now()).toISOString();

export default function (eleventyConfig) {
    eleventyConfig.addNunjucksAsyncFilter("githubReleases", async function(owner, repo, callback) {
        const token = process.env.GITHUB_ACCESS_TOKEN;
        if (!owner || !repo) return callback(null, []);
        
        const url = `https://api.github.com/repos/${owner}/${repo}/releases`;
        
        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                    "User-Agent": "eleventy-build"
                }
            });
            if (!res.ok) return callback(null, [ name = "Error fetching releases for GitHub project." ]);
            const data = await res.json();
            callback(null, data);
        } catch (err) {
            console.error(err);
            callback(null, []);
        }
    });

    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setOutputDirectory("public");
    eleventyConfig.addPassthroughCopy("src/projects/**/*.png");
    eleventyConfig.addPassthroughCopy("src/projects/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/projects/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("src/authors/**/*.png");
    eleventyConfig.addPassthroughCopy("src/authors/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/authors/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy({ "src/favicon/*" : "/" });
    eleventyConfig.addGlobalData("pathPrefix", pathPrefix);
    eleventyConfig.addGlobalData("buildTime", buildTime);
    
    eleventyConfig.addCollection("projects", function(collection) {
        const col = collection.getFilteredByGlob("src/projects/*/*.md");        
        return col;
    });
    
    eleventyConfig.addGlobalData("eleventyComputed", {
        projectData: (data) => {
            const inputPath = data.page.inputPath;
            if (!inputPath.match(/\/projects\/[^\/]+\/docs\//)) return null;
            
            const projectDir = path.dirname(path.dirname(inputPath));
            const projectJson = path.join(projectDir, "index.json");
            
            if (fs.existsSync(projectJson)) {
                return JSON.parse(fs.readFileSync(projectJson, "utf-8"));
            }
            return { name: path.basename(projectDir) };
        },
        layout: (data) => {
            const inputPath = data.page.inputPath;
            if (inputPath.match(/\/projects\/[^\/]+\/docs\//)) return "docs.njk";
            return data.layout;
        },
        projectSlug: data => {
            const url = data.page?.url || data.page?.filePathStem || "";
            return url.replace(/\/$/,'').split('/').filter(Boolean).pop() || null;
        }
    });
    
    eleventyConfig.addCollection('searchIndex', (collectionApi) => {
        const result =  collectionApi.getAll().map(item => {
            return {
                title: item.data.name,
                subtitle: item.data.subtitle || "",
                author: item.data.author,
                url: item.url,
                image: (item.data.logoName && item.data.logoExtension) ? item.url + item.data.logoName + '.' + item.data.logoExtension : '',
                tags: item.data.tags
            };
        });
        
        allPlugins = result;
        return result;
    });
    
    eleventyConfig.on('afterBuild', () => {
        const idx = elasticlunr(function () {
            this.setRef('url');
            this.addField('title', { boost: 2 });
            this.addField('subtitle');
            // this.addField('tags') so search does not match
            
            allPlugins.forEach(doc => this.addDoc(doc));
        });
        
        fs.writeFileSync('./public/search_index.json', JSON.stringify(idx));
    });
    
    return {
        pathPrefix
    }
    
};
