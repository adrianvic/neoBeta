import elasticlunr from 'elasticlunr';
import fs from 'fs';
import path from 'path';

let allPlugins = [];

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("projects/**/*.png");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpg");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("authors/**/*.png");
    eleventyConfig.addPassthroughCopy("authors/**/*.jpg");
    eleventyConfig.addPassthroughCopy("authors/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy({ "favicon/*" : "/" });
    
    eleventyConfig.addCollection("projects", function(collection) {
        return collection.getFilteredByGlob("./projects/**/*.md");
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
        
        fs.writeFileSync('./_site/search_index.json', JSON.stringify(idx));
    });
};
