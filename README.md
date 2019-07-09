# Connection news portal

For my bachelor graduation I researched news consumption and the way readers interact with online articles. Based on interviews, theoretical research and user tests, I developed then a concept for an interaction design with the aim to guide users towards reading further into topics they are interested in, while offering more content than just repetition.

Back then the thesis was presented with a mock-up for the interaction. While at SPICED I had one week to work on a final project of my choice, and I decided to start building a web app that would apply this interaction concept. This repo contains that code build in one week, which I hope to be able to further develop soon.

### Viewing

All pages where links to articles are presented to readers show unread articles higher up. This happens after users log in, because only then can we keep track consistently of what has been read.
![Links change rank](http://g.recordit.co/3WNEWM1duf.gif)

### Adding articles

Journalists use the same login system as readers, but get to see other options thanks to conditional rendering of React components. So far what they see is a link to a CMS form where they can upload a new article.
![Journalist login and article upload](http://g.recordit.co/SkVRhs2vUg.gif)

### Adding links

After an article is uploaded it is not immediately visible for readers. It first has to be checked by an editor and published. Part of this process includes addition of links between that article and others.
![Editor options](http://g.recordit.co/DpCFrrdcWA.gif)

### Yet to come

There are sadly some aspects of the interaction missing, which I would like to rectify in the future. Most prominent being:

-   Visualization of articles read by user. Database is already structured to save articles in corresponding "books".
-   Improvement of ranking of links displayed.
-   Design:
    -   animation link correlation icons
    -   forms improvement
    -   image upload pop ups
-   Improvement of cms:
    -   links from article already published to same article in cms
    -   multiple pictures
    -   rich text editor
    -   overview of links for editors
    -   overview of unpublished articles
