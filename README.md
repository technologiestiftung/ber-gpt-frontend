![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<div align="center">
<img src="public/images/parla-logo-v1.png" width="50%">
</div>

# _BärGPT - AI chat assistant_

BärGPT is a productive AI testing environment available for employees of the Berlin state administration, provided by CityLAB Berlin. BärGPT is designed to help test the practical applications of artificial intelligence for administrative work. In addition to a chat function, BärGPT includes a number of initial smaller applications (AI apps) for specific tasks in the administrative context. The list of applications will be continuously expanded in dialogue with employees of the Berlin administration. To support this, we will offer regular workshops in the future and welcome ideas and feedback.

## Why did we develop BärGPT?

In the spring of 2024, the Berlin Senate Chancellery convened an "AI Taskforce" and organized a series of workshops at CityLAB Berlin to discuss the potential applications of artificial intelligence in administrative work. During these discussions, it became clear that there was a need to provide employees with a low-threshold testing environment, allowing them to experiment with initial ideas in a protected setting. In response, CityLAB offered to establish such a platform.

## What should I keep in mind regarding data protection and data security?

BärGPT offers users a selection of different large language models, which vary in terms of data protection.

- The model `azure-gpt-4o-mini` is operated by Microsoft in a data center in Sweden, and thus falls under GDPR regulations. Input data is neither stored nor used for training purposes. This model offers a higher level of data protection compared to similar offerings from the U.S.
- The model `openai-gpt-4o-mini` provides the same functionality but is operated by OpenAI in the United States. This model should only be used for comparison purposes, as it offers no advantages over the Microsoft model.
- The model `citylab-macstudio-llama-3.1` is hosted by CityLAB Berlin in compliance with data protection regulations. It is an open-source model, which in many cases can match the quality of commercial models.
It is important to note that none of the available AI models are operated within the Berlin state network. Therefore, personal or otherwise sensitive data, as well as data intended exclusively for use within the Berlin state network, must not be entered.

## Can BärGPT also be used for other use cases?

BärGPT is a flexible AI infrastructure and can, in principle, be adapted and further developed for various use cases and contexts. Do you have an idea for a specific use case where BärGPT could be helpful? If so, we would be happy to hear from you.

n line with the principle of "Public Money - Public Code," CityLAB Berlin releases all prototypes, including BärGPT, under an Open Source license. This means that BärGPT can and should be used and further developed without restrictions or prior permission. However, we would appreciate feedback if BärGPT is being used and are happy to assist with the initial steps.

## Prerequisites

- vercel.com account

## Needed Environment Variables

```plain
NEXT_PUBLIC_PARLA_API_URL=https://domain-of-your-api-server.dev
```

## Optional Environment Variables

To enable [Matomo](https://matomo.org/) tracking, set the following environment variables:

```plain
NEXT_PUBLIC_MATOMO_URL=
NEXT_PUBLIC_MATOMO_SITE_ID=
```

## Installation

```bash
npm ci
```

## Deploy

Assuming you have a vercel.com account and you are logged in.

```bash
# does the first deployment and project creation
npx vercel
# add your env variables (interactive)
npx vercel env add NEXT_PUBLIC_PARLA_API_URL
# deploy again for production
npx vercel --prod
```

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Tests

```bash
npm t
```

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.awsm.de/"><img src="https://avatars.githubusercontent.com/u/434355?v=4?s=64" width="64px;" alt="Ingo Hinterding"/><br /><sub><b>Ingo Hinterding</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=Esshahn" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raphael-arce"><img src="https://avatars.githubusercontent.com/u/8709861?v=4?s=64" width="64px;" alt="Raphael.A"/><br /><sub><b>Raphael.A</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=raphael-arce" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aeschi"><img src="https://avatars.githubusercontent.com/u/56318362?v=4?s=64" width="64px;" alt="aeschi"/><br /><sub><b>aeschi</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=aeschi" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jaszkowic"><img src="https://avatars.githubusercontent.com/u/10830180?v=4?s=64" width="64px;" alt="Jonas Jaszkowic"/><br /><sub><b>Jonas Jaszkowic</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=Jaszkowic" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

<table>
  <tr>
    <td>
      Made by <a href="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://logos.citylab-berlin.org/logo-berlin-senatskanzelei-de.svg" />
      </a>
    </td>
  </tr>
</table>

## Related Projects

- https://github.com/technologiestiftung/ber-gpt-backend
<!-- touch again -->