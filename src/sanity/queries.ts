// src/sanity/queries.ts
import { groq } from "next-sanity";

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  content[]{
    ...,
    _type,
    _key,

    // HERO
    _type == "hero" => {
      ...,
      bg{..., asset->},
      logo{..., asset->},
      clouds{
        ...,
        sprites[]{..., asset->}
      }
    },

    // IMAGE FEATURE
    _type == "imageFeature" => {
      _type,
      _key,
      layout,
      radius,
      showUnderline,
      headline,
      image,
      anim,
      Cards[]{
        _key,
        eyebrow,
        title,
        body,
        cta
      }
    },
    // Розкриваємо саме наш блок:
    _type == "marketExpansionSection" => {
      _type, _key, title, palette, typography, layout,
      items[]{
        _key, title, description, alt,
        // віддаємо посилання на будь-який тип іконки
        "iconUrl": coalesce(icon.asset->url, iconSvgFile.asset->url),
        iconSvg
      }
    },
    _type == "commercialMarketingSection" => {
      _type, _key, title, palette, typography, layout,
      cards[]{
        _key, title,
        items[]{
          _key, text,
          "iconUrl": icon.asset->url,
          iconSvg, alt
        }
      }
    },

    // TYPING TEXT
    _type == "typingText" => {
      ...
    },

    // TRANSITION
    _type == "transition" => {
      ...,
      fromBg{..., asset->},
      toBg{..., asset->}
    },

    // FEATURES
    _type == "features" => {
      ...,
      items[]{
        ...,
        icon{..., asset->}
      }
    },
    // усередині content[] { ... } вашого pageBySlugQuery додайте:
    _type == "expStatSection" => {
      _type, _key,
      headline,
      palette, typography, layout,
      "image": image{..., asset->},
      cards[]{
        _key, kicker, title, description,
        cta{ text, url }
      }
    },
    // Contact CTA
      _type == 'contactCta' => {
      _type,
      _key,
      eyebrow,
      title,
      ctaLabel,
      recipients,
      theme,
      bg,
      successTitle,
      successBody,
      
    },

    // ADVISORY SECTION (наш новий блок)
    _type == "advisorySection" => {
      _type,
      _key,
      title,
      palette{
        progressColor,
        sectionBg,
        headingColor,
        bodyColor,
        cardDefaultBg,
        cardDefaultText
      },
      typography{
        headingFont,
        bodyFont,
        headingSize,
        bodySize
      },
      animation{
        type,
        autoplayMs,
        transitionMs,
        easing,
        pauseOnHover,
        pauseOnTouch
      },
      cards[]{
        _key,
        title,
        description,
        bgColor,
        textColor
      }
    }
  }
}
`;
