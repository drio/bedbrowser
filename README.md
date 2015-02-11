### Intro

This is a little web app aiming to show the power of
[DNAism](https://github.com/drio/dnaism) and
[bedserver](https://github.com/drio/bedserver) for exploring genomic datasets.

### Details

[DNAism](https://github.com/drio/dnaism) is a javascript library to visualize
genomic data using Horizon Charts. Head to the DNAism page to get more details.
The user defines the region of the genome to visualize by defining a context.
Then it specifies sources and samples which are the components that provide the
actual data. The component that does the plotting (horizon) uses the source and
the samples components to pull the necessary datapoints for the visualization.
In the context, we also define the size of the plot, the sizes determines how
many datapoints the horizon component requests to the sources.

When I started writing [DNAism](https://github.com/drio/dnaism), I created the most
simple source posible: a bedfile. Although simple, it was inefficient since we
had to pull all the available datapoints for a region in order to compute the
values required by the visualization, typically much less than the size of the
region.

That's why I wrote another source, bedserver, which let's a backend to do the
heavy lifting and return to the client (browser) only the necessary points for
the visualization. Besides the new source, I also wrote the
([Bedserver](https://github.com/drio/bedserver)), which is the backend for
the bedserver source.

### Example

Let me walk you through a simple example to see how all this projects work
together to visualize bed datasets.

First, let's install the ([Bedserver](https://github.com/drio/bedserver)),
follow the ([README](https://github.com/drio/bedserver)) to perform the
installation and familiarize yourself with how the server works.

Now, let's download the webbroser webapp in the current directory. Along
with the app, we are going to download a couple of testing datasets to
be able to use the app. You can later add your own datasets:

```sh
$ cd /somewhere
$ curl -L https://github.com/drio/bedbrowser/tarball/master | tar zxvf -
$  cd drio-bedbrowser-*
```

Now fire up the bedserver:

```sh
$ bedserver
 * Running on http://127.0.0.1:5000/
 * Restarting with reloader
````

And, now fire up your browser and go to `localhost:5000/index.html`. You should
see something like this:

![](http://f.cl.ly/items/2R3e0u17061B3X3n302g/Screen%20Shot%202014-03-28%20at%2015.21.40.png)

The app is showing you all the different projects and its samples. Here we only
have two projects (depth and snp_density) and its samples.

Now, select all the depth samples and click Run, that should take you to the
visualization page:

![](http://f.cl.ly/items/461D1q1p31172K0o2p0E/Screen%20Shot%202014-03-28%20at%2015.23.23.png)

Now, enter the region you have in the example that comes in the input text box:
`Chr17:1100000-1200000` and click vizit. The app will render the visualization for
that region for the samples we selected previously:

![](http://f.cl.ly/items/1t2m2z432w1I2d2a3J42/Screen%20Shot%202014-03-28%20at%2015.25.49.png)

Now, feel free to incorporate your datasets and use the app to browse them.



