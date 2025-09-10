import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Type-check frontmatter using a schema
const blogCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// reference the authors collection https://docs.astro.build/en/guides/content-collections/#defining-collection-references
			authors: z.array(reference("authors")),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.or(z.date())
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			heroImage: image(),
			categories: z.array(z.string()),
            // blog posts will be excluded from build if draft is "true"
            draft: z.boolean().optional(),
        }),
});

// authors
const authorsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/authors" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image(),
			about: z.string(),
			email: z.string(),
			authorLink: z.string(), // author page link. Could be a personal website, github, twitter, whatever you want
		}),
});

// services
const servicesCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/services" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
            image: image(),
            // services will be excluded from build if draft is "true"
            draft: z.boolean().optional(),
        }),
});

// other pages
const otherPagesCollection = defineCollection({
    loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/otherPages" }),
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string(),
            builder: z
                .array(
                    z.object({
                        discriminant: z.enum([
                            'hero',
                            'servicesSideImage',
                            'featureCardsSmall',
                            'testimonialsSwiper',
                            'featureLightboxMarquee',
                            'ctaCardCenter',
                            'faqAccordions',
                            'team',
                        ] as const),
                        value: z.unknown().optional(),
                    }),
                )
                .optional(),
            draft: z.boolean().optional(),
        }),
});

export const collections = {
	blog: blogCollection,
	authors: authorsCollection,
	services: servicesCollection,
	otherPages: otherPagesCollection,
	testimonials: defineCollection({
		loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/testimonials" }),
		schema: ({ image }) =>
			z.object({
				name: z.string(),
				title: z.string().optional(),
				company: z.string().optional(),
				quote: z.string(),
				image: image().optional(),
				link: z.string().optional(),
				featured: z.boolean().optional(),
				tags: z.array(z.string()).optional(),
			}),
	}),
};
