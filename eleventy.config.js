import elasticlunr from 'elasticlunr';
import fs from 'fs';

let allPlugins = [];

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("projects/**/*.png");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpg");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("authors/**/*.png");
    eleventyConfig.addPassthroughCopy("authors/**/*.jpg");
    eleventyConfig.addPassthroughCopy("authors/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("assets");
    
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
