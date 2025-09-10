/**
 * * This is the Keystatic configuration file. It is used to define the collections and fields that will be used in the Keystatic CMS.
 *
 * ! This works in conjunction with Astro content collections. If you update one, you must update the other.
 *
 * Access keystatic interface at /admin or /keystatic
 * This works in local mode in dev, then cloud mode in prod
 * Cloud deployment is free to sign up (up to 3 users per team)
 * Docs: https://keystatic.com/docs/cloud
 * Create a Keystatic Cloud account here: https://keystatic.cloud/
 */

import { config, fields, singleton, collection } from "@keystatic/core";

// components
import Collections from "@components/KeystaticComponents/Collections";

export default config({
	// works in local mode in dev, then cloud mode in prod
	storage: import.meta.env.DEV === true ? { kind: "local" } : { kind: "cloud" },
	// cloud deployment is free to sign up (up to 3 users per team)
	// docs: https://keystatic.com/docs/cloud
	// create a Keystatic Cloud account here: https://keystatic.cloud/
	cloud: { project: "cosmic-themes/stellar" },
	ui: {
		brand: { name: "Cosmic Themes" },
	},
    collections: {
        blog: Collections.Blog(),
        authors: Collections.Authors(),
        services: Collections.Services(),
        testimonials: collection({
            label: "Testimonials",
            path: "src/data/testimonials/*/",
            slugField: "name",
            entryLayout: "form",
            schema: {
                name: fields.slug({
                    name: { label: "Name", validation: { isRequired: true } },
                    slug: { label: "Slug" },
                }),
                title: fields.text({ label: "Title / Role", description: "e.g. CMO, Acme Co.", validation: { isRequired: false } }),
                company: fields.text({ label: "Company", validation: { isRequired: false } }),
                quote: fields.text({ label: "Quote", multiline: true, validation: { isRequired: true } }),
                image: fields.image({ label: "Avatar", directory: "src/data/testimonials/", publicPath: "../" }),
                link: fields.url({ label: "Link", description: "Optional", validation: { isRequired: false } }),
                featured: fields.checkbox({ label: "Featured" }),
                tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags" }),
            },
        }),
    },
    singletons: {
        home: singleton({
            label: "Home",
            path: "src/data/otherPages/home/index",
            entryLayout: "content",
            format: { contentField: "content" },
            previewUrl: "/",
            schema: {
                title: fields.text({ label: "Title" }),
                description: fields.text({
                    label: "Description",
                    validation: { isRequired: true, length: { min: 1, max: 160 } },
                }),
                // page builder
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
                        testimonials: {
                            label: "Testimonials",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                    items: fields.array(
                                        fields.object(
                                            {
                                                testimonial: fields.relationship({ label: "Testimonial", collection: "testimonials" }),
                                                nameOverride: fields.text({ label: "Name Override", description: "Optional" }),
                                                titleOverride: fields.text({ label: "Title/Role Override", description: "Optional" }),
                                                quoteOverride: fields.text({ label: "Quote Override", multiline: true, description: "Optional" }),
                                                imageOverride: fields.image({ label: "Avatar Override", directory: "src/data/otherPages/", publicPath: "../" }),
                                            },
                                            { label: "Testimonial" },
                                        ),
                                        { label: "Items" },
                                    ),
                                },
                                { label: "Testimonials Settings" },
                            ),
                        },
                        servicesSideImage: {
                            label: "Services (Side Image)",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                    services: fields.array(
                                        fields.object(
                                            {
                                                service: fields.relationship({
                                                    label: "Service",
                                                    collection: "services",
                                                }),
                                                titleOverride: fields.text({ label: "Title Override", description: "Optional" }),
                                                descriptionOverride: fields.text({ label: "Description Override", multiline: true, description: "Optional" }),
                                                imageOverride: fields.image({
                                                    label: "Image Override",
                                                    directory: "src/data/otherPages/",
                                                    publicPath: "../",
                                                }),
                                                hrefOverride: fields.url({ label: "Link Override", description: "Optional" }),
                                            },
                                            { label: "Card" },
                                        ),
                                        {
                                            label: "Cards",
                                            itemLabel: (props) => (props.fields.titleOverride.value as string) || (props.fields.service.value as string) || "Service",
                                            validation: { length: { min: 1 } },
                                        },
                                    ),
                                },
                                { label: "Services Settings" },
                            ),
                        },
                        featureCardsSmall: {
                            label: "Feature Cards (Small)",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                    items: fields.array(
                                        fields.object(
                                            {
                                                icon: fields.text({ label: "Icon (e.g. tabler/paint)" }),
                                                title: fields.text({ label: "Title" }),
                                                text: fields.text({ label: "Text", multiline: true }),
                                            },
                                            { label: "Feature" },
                                        ),
                                        {
                                            label: "Features",
                                            itemLabel: (props) => (props.fields.title.value as string) || "Feature",
                                            validation: { length: { min: 1 } },
                                        },
                                    ),
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
                    validation: { isRequired: false },
                }),
            },
        }),
        about: singleton({
            label: "About",
            path: "src/data/otherPages/about/index",
            entryLayout: "content",
            format: { contentField: "content" },
            previewUrl: "/about",
            schema: {
                title: fields.text({ label: "Title" }),
                description: fields.text({
                    label: "Description",
                    validation: { isRequired: true, length: { min: 1, max: 160 } },
                }),
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
                        testimonials: {
                            label: "Testimonials",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                    items: fields.array(
                                        fields.object(
                                            {
                                                testimonial: fields.relationship({ label: "Testimonial", collection: "testimonials" }),
                                                nameOverride: fields.text({ label: "Name Override", description: "Optional" }),
                                                titleOverride: fields.text({ label: "Title/Role Override", description: "Optional" }),
                                                quoteOverride: fields.text({ label: "Quote Override", multiline: true, description: "Optional" }),
                                                imageOverride: fields.image({ label: "Avatar Override", directory: "src/data/otherPages/", publicPath: "../" }),
                                            },
                                            { label: "Testimonial" },
                                        ),
                                        { label: "Items" },
                                    ),
                                },
                                { label: "Testimonials Settings" },
                            ),
                        },
                        team: {
                            label: "Team",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                },
                                { label: "Team Settings" },
                            ),
                        },
                        servicesSideImage: {
                            label: "Services (Side Image)",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                    services: fields.array(
                                        fields.object(
                                            {
                                                service: fields.relationship({
                                                    label: "Service",
                                                    collection: "services",
                                                }),
                                                titleOverride: fields.text({ label: "Title Override", description: "Optional" }),
                                                descriptionOverride: fields.text({ label: "Description Override", multiline: true, description: "Optional" }),
                                                imageOverride: fields.image({
                                                    label: "Image Override",
                                                    directory: "src/data/otherPages/",
                                                    publicPath: "../",
                                                }),
                                                hrefOverride: fields.url({ label: "Link Override", description: "Optional" }),
                                            },
                                            { label: "Card" },
                                        ),
                                        {
                                            label: "Cards",
                                            itemLabel: (props) => (props.fields.titleOverride.value as string) || (props.fields.service.value as string) || "Service",
                                            validation: { length: { min: 1 } },
                                        },
                                    ),
                                },
                                { label: "Services Settings" },
                            ),
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
                        featureCardsSmall: {
                            label: "Feature Cards (Small)",
                            schema: fields.object(
                                {
                                    title: fields.text({ label: "Section Title" }),
                                    items: fields.array(
                                        fields.object(
                                            {
                                                icon: fields.text({ label: "Icon (e.g. tabler/paint)" }),
                                                title: fields.text({ label: "Title" }),
                                                text: fields.text({ label: "Text", multiline: true }),
                                            },
                                            { label: "Feature" },
                                        ),
                                        {
                                            label: "Features",
                                            itemLabel: (props) => (props.fields.title.value as string) || "Feature",
                                            validation: { length: { min: 1 } },
                                        },
                                    ),
                                },
                                { label: "Feature Cards Settings" },
                            ),
                        },
                    },
                    { label: "Page Builder" },
                ),
                draft: fields.checkbox({ label: "Draft" }),
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
                    validation: { isRequired: false },
                }),
            },
        }),
        privacyPolicy: singleton({
            label: "Privacy Policy",
            path: "src/data/otherPages/privacy-policy/index",
            entryLayout: "content",
            format: { contentField: "content" },
            previewUrl: "/privacy-policy",
            schema: {
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description" }),
                draft: fields.checkbox({ label: "Draft" }),
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
                            directory: `src/data/otherPages/`,
                            publicPath: "../",
                        },
                        divider: true,
                        codeBlock: true,
                    },
                }),
            },
        }),
        terms: singleton({
            label: "Terms of Use",
            path: "src/data/otherPages/terms/index",
            entryLayout: "content",
            format: { contentField: "content" },
            previewUrl: "/terms",
            schema: {
                title: fields.text({ label: "Title" }),
                description: fields.text({ label: "Description" }),
                draft: fields.checkbox({ label: "Draft" }),
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
                            directory: `src/data/otherPages/`,
                            publicPath: "../",
                        },
                        divider: true,
                        codeBlock: true,
                    },
                }),
            },
        }),
    },
});
