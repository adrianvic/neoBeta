import elasticlunr from 'elasticlunr';
import fs from 'fs';

let allPlugins = [];
let lunrIndex = null;

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("projects/**/*.png");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpg");
    eleventyConfig.addPassthroughCopy("projects/**/*.jpeg");
    eleventyConfig.addPassthroughCopy("assets");
    
    eleventyConfig.addCollection('searchIndex', (collectionApi) => {
        const result =  collectionApi.getFilteredByTag("plugin").map(item => {
            return {
                title: item.data.projectName,
                subtitle: item.data.projectSubtitle || "",
                url: item.url
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
            
            allPlugins.forEach(doc => this.addDoc(doc));
        });
        
        fs.writeFileSync('./_site/search_index.json', JSON.stringify(idx));
    });
};
