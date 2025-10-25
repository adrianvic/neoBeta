import elasticlunr from 'elasticlunr';
import fs from 'fs';

let allPlugins = [];

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("projects/**/*.png");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpg");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("assets");
    
    eleventyConfig.addCollection('searchIndex', (collectionApi) => {
        const result =  collectionApi.getAll().map(item => {
            return {
                title: item.data.projectName,
                subtitle: item.data.projectSubtitle || "",
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
            this.addField('tags')
            
            allPlugins.forEach(doc => this.addDoc(doc));
        });
        
        fs.writeFileSync('./_site/search_index.json', JSON.stringify(idx));
    });
};
