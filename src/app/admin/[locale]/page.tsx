'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useTina, tinaField } from 'tinacms/dist/react';
import client from "../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { PortfolioHighlights } from "@/components/sections/Portfolio/PortfolioHighlights";

const pageQuery = `query Home($relativePath: String!) {
  pages(relativePath: $relativePath) {
    _sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    title
    description
    lastUpdate
    selectedProjects
    hero {
      title
      titleAccent
      titleEnd
      subtitle
      ctaButton
      briefButton
      image
    }
    technology {
      title
      description
      items {
        name
        icon
        useBrightness
      }
    }
    offer {
      title
      titleAccent
      subtitle
      sectionLabel
      services {
        title
        description
        icon
        features
        link
        buttonText
      }
    }
    brief {
      title
      description
      buttonText
      contact {
        email
        phone
        address
        addressLine2
        city
      }
    }
    portfolio {
      title
      description
      sectionLabel
    }
    portfolioHighlights {
      title
      description
      projects {
        title
        slug
        excerpt
        image
        imageAlt
        category
        date
        featured
      }
    }
    howWeWork {
      title
      description
      steps {
        title
        description
        icon
        duration
      }
      ctaTitle
      ctaDescription
      ctaButton
    }
    faq {
      title
      description
      items {
        question
        answer
      }
      ctaQuestion
      ctaButton
    }
    contact {
      title
      description
      contactDataTitle
      email
      phone
      address
      addressLine2
      city
      successTitle
      successMessage
      nameLabel
      emailLabel
      messageLabel
      buttonText
    }
  }
}`;

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';
  const messages = useMessages();

  const [initialPageData, setInitialPageData] = useState<any>({
    pages: { _values: {} },
    portfolioConnection: { edges: [] },
  });

  useEffect(() => {
    async function load() {
      try {
        const [pageRes] = await Promise.all([
          client.queries.pages({ relativePath: `${locale}/home.mdx` }),
        ]);

        setInitialPageData({
          pages: pageRes.data.pages,
          portfolioConnection: { edges: [] },
        });
      } catch (e) {
        console.warn('[admin home] data fetch failed', e);
      }
    }
    load();
  }, [locale]);

  const { data: pageData } = useTina({
    query: pageQuery,
    variables: { relativePath: `${locale}/home.mdx` },
    data: initialPageData,
  });

  const pagesData = pageData.pages as any;
  const heroData = pagesData?.hero;
  const technologyData = pagesData?.technology;
  const offerData = pagesData?.offer;
  const howWeWorkData = pagesData?.howWeWork;
  const portfolioHighlightsData = pagesData?.portfolioHighlights;
  const faqData = pagesData?.faq;
  const contactData = pagesData?.contact;
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="min-h-screen pt-20 relative overflow-hidden">
        <Background />
        <main className="relative z-10">
          {heroData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'hero')}>
              <Hero data={heroData as never} />
            </div>
          ) : null}
          {technologyData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'technology')}>
              <Technology data={technologyData as never} />
            </div>
          ) : null}
          {offerData ? (
            <div id="offer-section" data-tina-field={tinaField(pageData.pages as any, 'offer')}>
              <Offer data={offerData as never} />
            </div>
          ) : null}
          {howWeWorkData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'howWeWork')}>
              <HowWeWork data={howWeWorkData as never} />
            </div>
          ) : null}
          {portfolioHighlightsData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'portfolioHighlights')}>
              <PortfolioHighlights mode="tina" tinaData={portfolioHighlightsData} />
            </div>
          ) : null}
          {faqData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'faq')}>
              <FAQ data={faqData as never} />
            </div>
          ) : null}
          {contactData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'contact')}>
              <Contact data={contactData as never} />
            </div>
          ) : null}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
