import lunr from 'lunr';
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

		console.log("Collected " + result.length + " plugins for search index.");
		console.log(result);
		return result;
	});

    eleventyConfig.on('afterBuild', async (eleventyConfig) => {
        lunrIndex = lunr(function () {
            this.ref('url');
            this.field('title');
            this.field('subtitle');

            allPlugins.forEach(function (doc) {
                this.add(doc);
            }, this);
        });

        const indexJson = lunrIndex.toJSON();
        fs.writeFileSync('./_site/search_index.json', JSON.stringify(indexJson));
    });
};
