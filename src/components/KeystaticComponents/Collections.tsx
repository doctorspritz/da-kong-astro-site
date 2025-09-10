/**
 * * Keystatic Collection definitions that can take in languages and return the correct content
 * This makes it much cleaner to work with content in different languages
 */

import {
	collection,
	fields,
	// singleton,
} from "@keystatic/core";

// components
import ComponentBlocks from "@components/KeystaticComponents/ComponentBlocks";

// helpers

/**
 * * Blog posts collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Blog = () =>
	collection({
		label: `Blog`,
		slugField: "title",
		path: `src/data/blog/*/`,
		columns: ["title", "pubDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this post as draft to prevent it from being published.",
			}),

			authors: fields.array(
				fields.relationship({
					label: "Post author",
					collection: `authors`,
					// authors field in keystatic.config.tsx must match the collection name here
				}),
				{
					label: "Authors",
					validation: { length: { min: 1 } },
					itemLabel: (props) => props.value || "Please select an author",
				},
			),
			pubDate: fields.date({ label: "Publish Date" }),
			updatedDate: fields.date({
				label: "Updated Date",
				description: "If you update this post at a later date, put that date here.",
			}),

			heroImage: fields.image({
				label: "Hero Image",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			categories: fields.array(fields.text({ label: "Category" }), {
				label: "Categories",
				description: "This is NOT case sensitive.",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
            content: fields.mdx({
                label: "Content",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/blog/`,
						publicPath: "../",
						// schema: {
						//   title: fields.text({
						//     label: "Caption",
						//     description:
						//       "The text to display under the image in a caption.",
						//   }),
						// },
					},
					divider: true,
					codeBlock: true,
				},
                // Note: custom component blocks disabled here to avoid
                // potential admin preview issues; can be re-enabled later.
            }),
		},
	});

/**
 * * Authors collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Authors = () =>
	collection({
		label: `Authors`,
		slugField: "name",
		path: `src/data/authors/*/`,
		columns: ["name"],
		entryLayout: "content",
		format: { contentField: "bio" },
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: {
						isRequired: true,
					},
				},
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once this file is published!",
				},
			}),
			avatar: fields.image({
				label: "Author avatar",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			about: fields.text({
				label: "About",
				description: "A short bio about the author",
				validation: { isRequired: true },
			}),
			email: fields.text({
				label: "The author's email",
				description: "This must look something like `you@email.com`",
				validation: { isRequired: true },
			}),
			authorLink: fields.url({
				label: "Author Website or Social Media Link",
				validation: { isRequired: true },
			}),
			bio: fields.mdx({
				label: "Full Bio",
				description: "The author's full bio",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: false,
					link: true,
					image: {
						directory: "src/data/authors/",
						publicPath: "../",
					},
					divider: true,
					codeBlock: false,
				},
			}),
		},
	});

/**
 * * Services collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Services = () =>
	collection({
		label: `Services`,
		slugField: "title",
		path: `src/data/services/*/`,
		columns: ["title"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			image: fields.image({
				label: "Main Image",
				publicPath: "../",
				validation: { isRequired: true },
			}),

			draft: fields.checkbox({
				label: "Draft",
				description: "Set this page as draft to prevent it from being published.",
			}),
			content: fields.mdx({
				label: "Page Contents",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: false,
					heading: [2, 3, 4],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/services/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: false,
				},
				// components: {
				//   Admonition: ComponentBlocks.Admonition,
				// },
			}),
		},
	});

/**
 * * Other Pages collection
 * For items like legal pages, about pages, etc.
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const OtherPages = () =>
    collection({
        label: `Other Pages`,
        slugField: "title",
        path: `src/data/otherPages/*/`,
        columns: ["title"],
        entryLayout: "content",
        format: { contentField: "content" },
        schema: {
            title: fields.slug({
                name: { label: "Title" },
                slug: {
                    label: "SEO-friendly slug",
                    description: "Never change the slug once a file is published!",
                },
            }),
            description: fields.text({
                label: "Description",
                validation: { isRequired: true, length: { min: 1, max: 160 } },
            }),
            // Optional hero configuration for pages like the homepage
            hero: fields.object(
                {
                    heading: fields.text({ label: "Hero Heading" }),
                    subheading: fields.text({ label: "Hero Subheading" }),
                    ctaPrimaryText: fields.text({ label: "Primary CTA Text" }),
                    ctaPrimaryHref: fields.url({ label: "Primary CTA Link" }),
                    ctaSecondaryText: fields.text({ label: "Secondary CTA Text", description: "Optional" }),
                    ctaSecondaryHref: fields.url({ label: "Secondary CTA Link", description: "Optional" }),
                    // Add images later if needed
                },
                { label: "Hero" },
            ),
            // Block-style page builder: choose and order sections
            builder: fields.blocks(
                {
                    hero: {
                        label: "Hero",
                        schema: fields.object(
                            {
                                heading: fields.text({ label: "Heading" }),
                                subheading: fields.text({ label: "Subheading", multiline: true }),
                                ctaPrimaryText: fields.text({ label: "Primary CTA Text" }),
                                ctaPrimaryHref: fields.url({ label: "Primary CTA Link" }),
                                ctaSecondaryText: fields.text({ label: "Secondary CTA Text", description: "Optional" }),
                                ctaSecondaryHref: fields.url({ label: "Secondary CTA Link", description: "Optional" }),
                            },
                            { label: "Hero Settings" },
                        ),
                    },
                    servicesSideImage: {
                        label: "Services (Side Image)",
                        schema: fields.object(
                            {
                                title: fields.text({ label: "Section Title" }),
                            },
                            { label: "Services Settings" },
                        ),
                    },
                    featureCardsSmall: {
                        label: "Feature Cards (Small)",
                        schema: fields.object(
                            {
                                title: fields.text({ label: "Section Title" }),
                            },
                            { label: "Feature Cards Settings" },
                        ),
                    },
                    testimonialsSwiper: {
                        label: "Testimonials (Swiper)",
                        schema: fields.empty(),
                    },
                    featureLightboxMarquee: {
                        label: "Feature Lightbox Marquee",
                        schema: fields.empty(),
                    },
                    ctaCardCenter: {
                        label: "CTA Card (Center)",
                        schema: fields.object(
                            {
                                heading: fields.text({ label: "Heading" }),
                                description: fields.text({ label: "Description", multiline: true }),
                                ctaText: fields.text({ label: "CTA Text" }),
                                ctaHref: fields.url({ label: "CTA Link" }),
                            },
                            { label: "CTA Settings" },
                        ),
                    },
                    faqAccordions: {
                        label: "FAQ (Accordions)",
                        schema: fields.object(
                            {
                                title: fields.text({ label: "Section Title" }),
                            },
                            { label: "FAQ Settings" },
                        ),
                    },
                },
                { label: "Page Builder" },
            ),

            draft: fields.checkbox({
                label: "Draft",
                description: "Set this page as draft to prevent it from being published.",
            }),
            content: fields.mdx({
                label: "Page Contents",
                options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
                    image: {
                        directory: `src/data/otherPages/`,
                        publicPath: "../",
                    },
					divider: true,
					codeBlock: true,
				},
                // Note: custom component blocks disabled here to avoid
                // potential admin preview issues; can be re-enabled later.
                validation: { isRequired: false },
            }),
        },
    });

export default {
	Blog,
	Authors,
	Services,
	OtherPages,
};
