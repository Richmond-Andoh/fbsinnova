export const content = {
  links: {
    about: 'https://agroinnovagh.com/',
    download: 'https://play.google.com/store/apps/details?id=com.agroinnova.farmerbusinessschool2&hl=en&gl=US',
    twitter: 'https://twitter.com/AgroInnovaGH',
    facebook: 'https://facebook.com/AgroInnovaGH',
    instagram: 'https://instagram.com/AgroInnovaGH',
    email: 'mailto:info@fbsinnova.com',
  },
  description: 'FBSInnova is a functional, modular smartphone application that helps smallholder-farmers have on-demand access to Farmer Business School(FBS) tools and information, plan and efficiently manage their crops and diversify their production for increased profitability and improved livelihoods.',
  features: [
    { title: 'Get educated', icon: 'set2.4342d752.png', body: 'Daily curated content on technical advice that enlightens the farmer on best farming practices. Education on personal finances and household accounting in terms of savings and spendings.' },
    { title: 'Track your finances', icon: 'fin_1.2cc78931.png', body: 'The accounting feature allows farmers to track their money in and money out. They are able to monitor their individual crops per plot separately and measure each crop’s finances.' },
    { title: 'Schedule farm activities', icon: 'fin5.7848c358.png', body: 'They can schedule and track their farm activities and receive prompts before due dates of scheduled activities with best farm practices serving as benchmarks.' },
  ],
  aim: [
    'We aim to solve the major challenge faced by smallholders farmers across Africa - Low crop yield due to lack of technical and entrepreneurial skills.',
    'Our solution is to help the smallholder farmer to use digital technologies to maximize efficiency in their farms by helping them learn, track and diversify their crops.',
    'With this tool we’re creating shared value for all the key actors along the agricultural value chain by bridging the data gaps and maximizing supply chain efficiency.',
  ],
  modulesIntro: 'FBSInnova uses three(3) primary modules to enable smallholder-farmers track thier finances, diversify thier crops and maximize income by equipping them with effective entrepreneurial skills.',
  modules: [
    { title: 'Educational hub', description: 'Get educated', icon: 'set2.4342d752.png', screen: 'greet.jpg' },
    { title: 'Money-In Money-Out', description: 'Track your finances', icon: 'fin_1.2cc78931.png', screen: 'accounting.jpg' },
    { title: 'Cropping calendar', description: 'Schedule farm activities', icon: 'fin5.7848c358.png', screen: 'season.jpg' },
  ],
  impacts: [
    { title: 'Livelihood empowerment for farmers', body: '11% of the world’s population live in extreme poverty down from 28% in 1999 according to the UNDP. Globally, more than 800 million people are still living in less than US$ 1.25 a day and many more lack access to adequate food. Food insecurity is therefore a major fundamental issue for which Agro Innova seeks to address. Agro Innova is empowering small-holder farmers to maximize their efficiency through our tailor made technological tools which helps them manage their farms effectively and have access to guaranteed markets through cost reduction solutions and increasing profitability. At Agro Innova, we ensure that our farmers have access to technology and markets that puts them in better position to scale their businesses which helps in the poverty eradication agenda.', image: 'innova1.239b3e1f.png', goal: 'poverty.0195b128.gif', goalNumber: '1', goalTitle: 'No Poverty' },
    { title: 'Ensuring sustainable food security', body: 'It is the SDGs aim to end all forms of hunger and malnutrition by 2030, making sure that all people have access to sufficient and nutritious food all year round through sustainable agricultural practices. Our business operations are focused on helping small-holder farmers produce food sustainably by providing them with timely information which helps them source for production inputs through the FBSInnova mobile application which provides Good Agricultural Practices. These tools and interventions empower our small-holder farmers to produce food sustainably.', image: 'innova3.d173da34.png', goal: 'zero_hunger.8c24a1f8.jpg', goalNumber: '2', goalTitle: 'Zero Hunger' },
    { title: 'Promote full and productive employment and decent work through access to finance', body: 'According to the ILO, more than 204 million people were unemployed in 2015. To lower this unemployment gap, higher levels of productivity and technological innovation is needed to drive the desired economic growth and promote decent work. Agro Innova contributes to this SDG through the deployment of our suite of digital technologies (like our mobile and web-based agricultural software FBS - Innova) to help achieve full, productive and decent work for all men and women in agribusinesses.', image: 'innova2.4fb5a77e.png', goal: 'economic.0b2fdcda.png', goalNumber: '8', goalTitle: 'Decent work and economic growth' },
    { title: 'Innovation solution to power the agricultural value chain', body: 'As global population increases, technological progress is key to finding lasting solutions to the growing economic issues. At Agro Innova, our objective is to ensure that our farmers have equal access to industry knowledge and information in real time to help them make informed decisions, foster innovation and entrepreneurship. The agricultural value chain, just like any other industry cannot survive or thrive without the right infrastructure and constant innovations. Agro Innova therefore is focused on constantly keeping our farmers engaged through our state-of-the-art digital technologies to advance their efficiency and productivity.', image: 'vue-mk-header.eae115b4.jpg', goal: 'innovation.38eaa703.jpg', goalNumber: '9', goalTitle: 'Industry, innovation and infrastructure' },
  ],
  address: 'No. 19 Banana Avenue, East Legon -Ghana',
  phone: '+233 24 09 56 276',
}

export const sourceImages = {
  hero: 'vue-mk-header.eae115b4.jpg',
  profileHero: 'cocoa_splash.6115e380.jpg',
  heroMockups: ['farm.jpg', 'greet.jpg', 'accounting.jpg'],
  logo: 'fbs_innova_full.90728393.png',
  symbol: 'fbs_innova.56def47d.png',
  slides: ['innova1.239b3e1f.png', 'innova2.4fb5a77e.png', 'innova3.d173da34.png'],
  partners: ['img_giz.fa04f358.png', 'mest.70847ba6.jpg', 'img_agro.3bc31b09.png'],
}
export const sourceAsset = (filename: string) => `/assets/source/${filename}`
