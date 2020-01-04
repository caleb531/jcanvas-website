# jCanvas Website

*Copyright 2016-2020, Caleb Evans*  
*Released under the MIT license*

This repository hosts the official website for [jCanvas](https://projects.calebevans.me/jcanvas/), the jQuery canvas library.

## Running the website locally

You are welcome and encouraged to clone this repository so you can have a local copy of the entire jCanvas documentation.

### 1. Clone repository

```bash
git clone https://github.com/caleb531/jcanvas-website.git
```

### 2. Install Jekyll and Bundler

The site requires Jekyll (3.0 or newer) and Bundler (1.12 or newer).

```bash
gem install jekyll
gem install bundler
```

### 3. Install site gems

```bash
bundle install
```

### 4. Download submodules

The site includes the jCanvas source repository as a submodule, so be sure to initialize that too.

```bash
git submodule update --init --recursive
```

### 5. Serve site locally

```bash
bundle exec jekyll serve
```

## Contributing

See any mistakes in the documentation or errors in the code? Please submit an [issue](https://github.com/caleb531/jcanvas-website/issues) or [pull request](https://github.com/caleb531/jcanvas-website/pulls)! All code contributions are welcome.
