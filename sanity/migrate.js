import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: 'o8hkbv97',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_TOKEN,
});

const blogPosts = [
  {
    id: "vaspa-partnership-2026",
    title: "Mustarred Partners with VASPA for 2026 Mastermind Builders' Luncheon",
    excerpt: "We are pleased to partner with VASPA as a sponsor of the 2026 Mastermind Builders' Luncheon, standing alongside builders advancing Nigeria's blockchain ecosystem. As the industry continues to evolve, strong compliance, security, and governance frameworks remain critical to building a resilient and sustainable virtual asset ecosystem.\n\nWe remain committed to supporting businesses and stakeholders shaping Nigeria's blockchain and Web3 landscape with bespoke compliance and security expertise",
    content: `We are pleased to partner with VASPA as a sponsor of the 2026 Mastermind Builders' Luncheon, standing alongside builders advancing Nigeria's blockchain ecosystem. As the industry continues to evolve, strong compliance, security, and governance frameworks remain critical to building a resilient and sustainable virtual asset ecosystem.

We remain committed to supporting businesses and stakeholders shaping Nigeria's blockchain and Web3 landscape with bespoke compliance and security expertise`,
    author: "Admin Mustarred",
    date: "2025-12-17",
    category: "Mustarred Insights",
    image: "/assets/images/blog/musta1.png",
  },
  {
    id: "regulatory-roundup-may-2025",
    title: "The Scoop: Regulatory Roundup (May 2025)",
    excerpt: "A comprehensive monthly digest of regulatory developments across Africa and beyond, covering data protection initiatives, digital asset regulations, fintech innovations, and major policy shifts from May 2025.",
    content: `# The Scoop: Regulatory Roundup (May 2025)

## Data Protection

### Kenya - Biometric and Child Data Guidelines

Kenya's Office of the Data Protection Commissioner (ODPC) issued draft guidance for public comment on managing sensitive personal data. Two new guidelines, one on biometric data (fingerprints, facial scans, iris patterns, etc.) and another on children's online information, were released for consultation. They propose strict rules (e.g., registration with the Data Protection Commission (DPC), legal processing bases, privacy impact assessments, breach notifications) for any entity handling biometrics.

Kenyans had until May 30 to submit feedback on the drafts, which were prompted by high-profile cases like the Worldcoin controversy, [according to recent reports](https://eastleighvoice.co.ke/sciencetechnology/154402/data-protection-commissioner-moves-to-protect-online-personal-data-with-new-guidelines).

### Rwanda - National Digital ID Rollout

The Rwandan government has announced a 12.2billion Rwandan Franc (US$8.5million) budget for 2025/26 to advance its [national digital ID system](https://www.biometricupdate.com/202505/rwanda-launching-digital-identity-biometrics-enrollment-with-8-5m-budget#:~:text=The%20government%20of%20Rwanda%20is,fingerprint%20and%20iris%20biometrics%20enrollment). The funding will accelerate setting up the Single Digital Identification System, including enrolling citizens' fingerprints and iris biometrics. Rwanda expects to finalize contracts soon and begin nationwide registration by late June. The project will establish biometric registration centers across the country and implement an Automated Biometric Identification System (ABIS) to verify and de-duplicate identities in real time.

With this initiative, Rwanda will join the league of countries like India (with Aadhaar) and Estonia, which have implemented similar national digital ID systems.

## Digital Assets

### United States - Senate Advances Stablecoin Regulatory Bill

On May 19, the US Senate voted 66-32 to advance the "GENIUS Act", a [landmark bill creating the first federal framework](https://www.cbsnews.com/news/senate-crypto-bill-second-try/#:~:text=Washington%20%E2%80%94%C2%A0The%20Senate%20advanced%20a,industry%20and%20the%20Trump%20family) for regulating stablecoins (cryptocurrency tokens pegged to fiat currencies). The bill had previously stalled amid concerns by Democrats over the Trump family's crypto ties but gained momentum with bipartisan support, clearing the 60-vote threshold required to proceed. If passed into law, the bill will require stablecoin issuers to hold reserves backing the cryptocurrency to protect consumers from risks during rapid sell-offs. It also mandates that issuers prioritize repayment to coin holders in bankruptcy and comply with anti-money laundering and anti-terrorism sanctions. The bill is widely seen as Congress's first serious attempt at comprehensive crypto regulation.

### South Africa - Court Rules Crypto Not 'money' or 'capital'

In a May 23 decision, the Pretoria High Court held that cryptocurrencies are not "money" or "capital" under South African exchange-control laws. The judgement overturned a central bank forfeiture order, finding that crypto assets do not meet the statutory definitions that would make them subject to seizure. The law firm, ENS, noted that this [ruling makes it clear](https://news.bloomberglaw.com/business-and-practice/south-africa-court-rules-crypto-is-not-capital-ens-says) that cryptocurrency is treated differently from foreign currency, underscoring calls for a dedicated regulatory framework in South Africa.

### Hong Kong - Stablecoin Licensing Regime Enacted

Hong Kong's Legislative Council on May 21 [passed a new law](https://www.reuters.com/world/asia-pacific/hong-kong-passes-stablecoin-bill-one-step-closer-issuance-2025-05-21/#:~:text=HONG%20KONG%2C%20May%2021%20,clarity%20for%20upcoming%20stablecoin%20issuers) requiring any issuer of fiat-backed stablecoins to obtain a licence from its central bank, the Hong Kong Monetary Authority (HKMA). Under the new ordinance, anyone issuing stablecoins in Hong Kong or issuing Hong Kong dollar-pegged coins abroad must be registered. The law also imposes rules on reserve management, redemption and risk control to protect consumers, reflecting Hong Kong's push to build a regulated stablecoin market.

### United Arab Emirates (UAE) (Dubai) - Vara Issues Updated Crypto Rulebook

On May 19, Dubai's Virtual Assets Regulatory Authority (VARA) [unveiled version 2.0](https://cointelegraph.com/news/dubai-crypto-regulator-updates-rulebooks-tightens-margin-trading) of its crypto rulebooks. The overhaul harmonizes standards across all virtual asset activities, tightens controls on margin trading and token distribution, and clarifies key terms like "collateral" and "qualified custodians".

Crucially, the updated issuance rules explicitly address real-world asset (RWA) tokens; regulated exchanges and broker‑dealers are now authorized to issue, distribute and list asset-backed tokens (categorized as Asset-Referenced Virtual Assets), making Dubai one of the first jurisdictions to formally legalize the tokenization of real assets under a clear framework.

Licensed crypto dealers have been mandated to comply with the new rules by 19 June 2025.

## Finance and Technology

### Kenya - Parliament Considers Bill Mandating Cash Acceptance

Legislators have presented a [bill to protect cash users](https://fintechmagazine.africa/2025/05/14/kenya-considers-mandating-cash-acceptance-for-transactions-under-775/#:~:text=In%20a%20move%20that%20could,payment%20option%20for%20everyday%20purchases) in Kenya's digital economy. The Central Bank (Amendment) Bill 2025 prohibits merchants from refusing physical legal tender for transactions below KSh100,000 (US$775). The bill aims to prevent the exclusion of the elderly and rural consumers who still rely on cash. If passed into law, businesses operating in physical locations would face fines of up to KSh100,000 for non-compliance. Supporters of the bill say the measure balances fintech innovation with the realities of cash dependence.

This move curiously deviates from the global move towards a cashless economy, with countries like Nigeria making regulations to enforce cashless transactions. It is also interesting to see what this means for AML efforts.

### South Africa - Vodacom's R20bn 5G Push

South Africa's largest mobile operator, Vodacom, [announced a R20 billion ($1.1billion) investment](https://techpoint.africa/news/vodacom-r20bn-5g/) for 2025/26 to expand 5G and rural network coverage. The funding will deepen broadband access in underserved areas, bolstering digital inclusion. Vodacom says this major spending plan underscores its commitment to improving nationwide connectivity through advanced 5G deployments.

## Other

### Nigeria - Infrastructure Builds with Local Content

Two ministries, the Ministry of Communication, Innovation, and Digital Economy and the Ministry of Mines and Steel Development, have [agreed to link major digital projects](https://fmcide.gov.ng/ministries-of-communications-innovation-digital-economy-and-steel-development-partner-to-drive-vision-for-1trillion-economy/#:~:text=At%20the%20heart%20of%20the,and%20foster%20homegrown%20industrial%20capacity) with the homegrown industry. The ministries are coordinating on two flagship initiatives to promote the use of locally sourced materials in infrastructure: a 90,000 km national fibre-optic backbone and the deployment of 7,000 new telecom towers and committed to using 100% Nigerian steel in these builds. The deal aims to boost local jobs and reduce imports by ensuring domestic manufacturing of cables, masts and other hardware.

### Tanzania - X Blocked After Police Account Hacked

Authorities have blocked access to X (formerly Twitter) for the third time since 2020. The shutdown came on the heels of a hack of the official account of the police account force and the publication of a tweet that falsely claimed President Samia Suluhu Hassan had died. This marks Tanzania's third X clampdown since 2020. The country previously blocked the platform during the 2020 elections for 11 days and again in 2024 for 1 day. The current shutdown, which began on May 21, brings the total number of days X has been blocked in Tanzania to 19 days.

The shutdown is part of a [growing trend across Africa](https://techpoint.africa/news/tanzania-blocks-x-after-police-hack/) where digital restrictions are used to curb unrest and control narratives. The estimated economic cost of the 19-day disruption is about $16.5 million (TZS 44.6 billion). Observers say such shutdowns stifle dissent, harm businesses, and erode public trust, costing Africa $1.5B in 2024 alone.`,
    author: "Admin Mustarred",
    date: "2025-05-24",
    category: "Compliance",
    image: "/assets/images/blog/tamara2.avif",
  },
];

async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'client', 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const ext = path.extname(imagePath).slice(1);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function migratePosts() {
  console.log('Starting migration of', blogPosts.length, 'blog posts...\n');

  for (const post of blogPosts) {
    try {
      console.log(`Migrating: ${post.title}`);

      // Upload featured image
      const featuredImage = await uploadImage(post.image);

      // Create blog post document
      const doc = {
        _type: 'blogPost',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.id,
        },
        author: post.author,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: new Date(post.date).toISOString(),
        featuredImage: featuredImage,
      };

      const result = await client.create(doc);
      console.log(`✅ Created: ${result._id}\n`);
    } catch (error) {
      console.error(`❌ Error migrating "${post.title}":`, error.message, '\n');
    }
  }

  console.log('Migration complete!');
}

migratePosts().catch(console.error);
