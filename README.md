codebridge.org.za
=================

This website is generated using [Jekyll](https://jekyllrb.com/), with a [Bootstrap 4](https://getbootstrap.com/) framework. It is hosted by GitHub that points to a custom domain. **We welcome any and all contributions!**

## Contribute

Contributions are more than welcome! Bug fixes and any other improvements are great. There's also a short [wish list](#wish-list) below. For these, or if you can think of any other way the website can improve, please open an issue or pull request.

### Jekyll

Once you've cloned a copy of the git, open a terminal from the project's directory and type the following:

    bundle exec jekyll serve

Open a browser and visit `http://localhost:4000` to preview the site. If you're new to Jekyll (or Ruby), you'll need to follow their simple [installation guide](https://jekyllrb.com/docs/home/).

### Wish List

- [x] A good image for Cape Town's Codebridge
- [ ] A good image for Durban's Codebridge
- [ ] More content! Please add yourself, your projects, events and tutorials. Share it in your networks, too!
- [ ] A nice background image for the hero on the homepage; something relevant and South African

## Managing content

The content on the website (people, events, projects, and tutorials) is managed through [a Google Sheet](https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/edit). There are two sheets for each content type.

The first is the sheet that is connected to the corresponding form. **This first sheet is the place to make changes to the content itself**. If an entry has some small mistake you want to fix, if you want to change the order of the content, add anything, etc - this is the place to do it.

**The second sheet is where you approve entries**. Don't change any of the content here, just focus on the first two columns that allow you to approve entries and select the ones you want to show on the homepage. This can be done by adding `approved` and `featured` to the relevant cells. It's quite self-explanatory and you can see how it's done for previous entries.

### Image specifications

Submitted images for events and projects should have a ratio of 2:1 (the width should be double the height). For people, images should be squared (1:1). Please check the (file) size of these images. Non-people image have a max displayed width of 360px. For people it's 155px. The submitted images really don't need to be big, so either tell people they should submit smaller images or do it yourself; [Imagemagick](http://www.imagemagick.org/script/index.php) is the proverbial bomb.

### A word of warning

Don't manually add new entries in the spreadsheet - use the form. It might be annoying, but if you manually add new entries the order messes up when someone uses a form. When a form is submitted, a *new* row is created below the existing form entries. If you manually add entries, new form entries will go below the old *form* entries rather than what you manually added. What happens is that form entries are then inserted into the middle of the content, which messes up the corresponding sheet where content is approved. There is probably a way to prevent this from happening, but for now just stick to the forms.