html












<figure>
	<img src='/img/components/thematic-earth/thematic-earth-1500x750.jpg' width='100%' />
	<figcaption>Browser based whole-Earth thematic maps using locally hosted data layers.</figcaption>
</figure>

##### Premium DOM Component

# Thematic Earth

## A world of possibilities


<address>
<img src='/img/48x48/rwtools.png' /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2022-12-30>Dec 30, 2022</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>The <span class=product>Thematic Earth</span> mapping software brings interactive cartography to browsers, allowing authors to easily map location-based data, while giving readers new insight into complex data patterns and outliers.</td></tr>
</table>

### At a Glance

The <span>Thematic Earth</span> mapping software has features similar
to GIS applications. It is well suited to publishers targeting today's modern
browser-centric readership. Here's an overview of <span>Thematic
Earth's</span> capabilities:


<details>
	<summary>Capabilities . . .</summary>
	<ul>
		<li><span class=product>Thematic Earth</span> excels at displaying dot maps, symbol maps, choropleths, isopleths, and geographic feature maps.</li>
		<li><span class=product>Thematic Earth</span> scales from neighborhood maps to whole Earth maps — from 1 ᵐ⁄ₚₓ to 1,000,000 ᵐ⁄ₚₓ</li>
		<li>Users can explore, discover, and learn from maps through mouse interactions, touchscreen gestures, and floating feedback panels.</li>
		<li>Cartographers can use existing vector data layers encoded as common geoJSON files or as highly compressed GFE files for fast network access.</li>
		<li>Data specialists can rely on <span class=product>Thematic Earth</span> to render geometries with minimal distortion, without projection hassles.</li>
		<li>Designers can visualize layers with sophisticated gradients, brushes and patterns using TESS, a declarative language following CSS syntax rules.</li>
		<li>Developers can use the component's JavaScript API to control the map's behavior, and use the component's event-based interface to respond to user interactions.</li>
		<li>DevOps can deploy <span class=product>Thematic Earth</span> maps without costly enterprise GIS server infrastructure.</li>
		<li>Communities working on common areas of interest can develop and share spatial data, configurations, legends, styles, and scripts using Thematic Earth Packages.</li>
		<li><span class=product>Thematic Earth</span> maps can be embedded in both online websites and offline progressive web applications.</li>
		<li><span class=product>Thematic Earth</span> maps automatically resize to fit the browser's viewport, allowing it to be used on both mobile devices and large mega-pixel displays.</li>
		<li><span class=product>Thematic Earth</span> maps are sandboxed, allowing a single web page to independently host side-by-side maps.</li>
		<li><span class=product>Thematic Earth</span> is self-contained, relying wholly on modern web component standards that require no framework scafolding.</li>
	</ul>
</details>

### Applications

Many different types of maps can be created using the <span>Thematic
Earth</span> software.


<details>
	<summary>Types of maps . . .</summary>
	<ul>
		<li>Choropleth maps can use colors and patterns to shade administrative regions with banded data ranges, such as demographic patterns or political trends.</li>
		<li>Isopleth maps can use contours and shading to show geographic areas of equal value, such as rainfall distributions, urban heat bubbles, or ocean salinity levels.</li>
		<li>Dot maps can use filled circles with radii proportional to data magnitude, such as disease distributions, or health care availability.</li>
		<li>Symbol maps can use markers to represent distinguishing data features, such as biodiversity markers, ecological trouble spots, or anthropological artifacts.</li>
		<li>Geographic feature maps can use symbols, lines and shapes to tell stories about a place and its cultural and physical geography.</li>
	</ul>
</details>

### Interaction

Users can interact with <span>Thematic Earth</span> maps using mouse
interactions, touchscreen gestures, keyboard shortcuts, and dockable menu
commands.


<details>
	<summary>Two-way interaction between user and map . . .</summary>
	<ul>
		<li>Reveal information about geographic features located under the mouse pointer by simply hovering over them.</li>
		<li>Click on features to build a selection list for customized feedback.</li>
		<li>Explore regions of the map by zooming the map's scale from 1 ᵐ⁄ₚₓ to 1,000,000 ᵐ⁄ₚₓ</li>
		<li>Focus on any point of the globe, even polar regions, reprojecting every map feature (on-the-fly) to the new point of observation.</li>
		<li>Interactively draw great circle routes between any two arbitrary places.</li>
		<li>Automatically show related data in dockable menu panels as the user interacts with the map.</li>
	</ul>
</details>

### Composition

<span>Thematic Earth</span> maps are constructed from spatial files,
layers, legends, and symbol specifiers working together to render points, lines
and polygons according to the cartographer's design.


<details>
	<summary>Spatial files . . .</summary>
	<p>Maps are constructed from spatial files containing records having unprojected geographic coordinates (simple latitude/longitude pairs).</p>
	<p><span class=product>Thematic Earth</span> supports eight types of spatial files:</p>
	<ul>
		<li>geojson - RFC 7946 <a href='https://geojson.org/'>(geojson.org)</a></li>
		<li>topojson - GeoJSON with topology <a href='https://github.com/topojson/topojson'>(github/topojson)</a></li>
		<li>gfe - Geographic Feature Encoding</li>
		<li>ice - Indexed Coordinate Encoding</li>
		<li>tae - Topological Arc Encoding</li>
		<li>gfebin - Geographic Feature Encoding binary</li>
		<li>icebin - Indexed Coordinate Encoding binary</li>
		<li>taebin - Topological Arc Encoding binary</li>
	</ul>
	<p>The <a href='https://hub.readwritetools.com/tasks/gcsio.blue'>GCS I/O </a> tool can assist with conversions. See <a href='https://medium.com/towards-data-science/2022-051-better-compression-of-gis-features-9f38a540bda5'>Better Compression of GIS Features</a> for how to get the fastest download times with large GIS files.</p>
</details>


<details>
	<summary>Layers . . .</summary>
	<p>Layers allow a single spatial file to be used in more than one way.	Layers connect spatial files to:</p>
	<ul>
		<li>Feature keys</li>
		<li>TESS identifiers</li>
		<li>TESS classnames</li>
		<li>Feedback menu options</li>
	</ul>
</details>


<details>
	<summary>Legends . . .</summary>
	<p>Legend items provide map users with a visual directory of the symbols, colors and styles used by map features. Legend items are synchronized to TESS declaration changes.</p>
</details>


<details>
	<summary>Symbol specifiers . . .</summary>
	<p>Map features are rendered using class-based and identifier-based drawing rules declared by the map's designer.</p>
	<p>Rules are specified using Thematic Earth Symbol Specifier (TESS) declarations, which are CSS-like statements that specify classnames, identifiers, attributes, values, and at-rules.</p>
</details>

### Deployment

The <span>Thematic Earth</span> mapping software is simple to deploy.
Your web server. Your web page. Your spatial data. Any browser.


<details>
	<summary>Dependency free . . .</summary>
	<p>The <span class=product>Thematic Earth</span> software uses standard custom element technology built into the HTML5 specification. <span class=product>Thematic Earth</span> does not use third-party frameworks, scaffolding, libraries or shims.</p>
	<p><span class=product>Thematic Earth</span> maps can be embedded into any modern browser-based setting, whether it's a desktop, laptop, tablet or mobile phone.</p>
	<p><span class=product>Thematic Earth</span> maps can be hosted on plain web servers; they do not need a specialized remote GIS tile server. Spatial files are retreived and cached locally, and may be embedded in offline progressive web application (PWAs).</p>
</details>

### Technologies

<span>Thematic Earth</span> maps are *configured* with HTML element
attributes, *controlled* by JavaScript statements, *styled* with TESS declarations,
and *shared* using plain-text packages.


<details>
	<summary>Configuring, controlling, styling, sharing . . .</summary>
	<ul>
		<li>The <span class=product>&lt;thematic-earth&gt;</span> HTML custom element has static attributes that configure the map's viewport size, scale, point of observation, time-lapse animation, and menu panel states.</li>
		<li>The software exposes a JavaScript API that allows autonomous control of the map's configuration, current state, and appearance.</li>
		<li>The software provides a JavaScript event interface that developers can use to provide synchronized feedback and external control.</li>
		<li>Thematic Earth Symbol Specifier (TESS) files allow map styling to be described with class-based and identifier-based visualization rules, and later refined with overriding feature-based rules.</li>
		<li>Spatial files, layer definitions, legend elements, configurations, and TESS declarations can be shared and reused through simple <i>packages</i> that can be created using plain-text editors.</li>
	</ul>
</details>

### Features

The <span>Thematic Earth</span> mapping software has unique features
that set it apart from typical GIS software.


<details>
	<summary>Features that stand out . . .</summary>
	<ul>
		<li><span class=product>Thematic Earth</span> is browser-based, taking full advantage of modern web component standards. By way of contrast, typical GIS software operates as either a desktop application or an enterprise server.</li>
		<li><span class=product>Thematic Earth</span> uses JavaScript, the native language of the web, for configuration and scripting. In contrast, typical GIS scripting uses the Python language, which isn't compatible with browsers.</li>
		<li><span class=product>Thematic Earth</span> uses on-the-fly coordinate projection, always keeping the map's point of observation, and viewport center, as the place of least distortion.</li>
		<li>Global datasets can be rendered without ever worrying about extreme distortion in the Arctic regions, or the "end-of-the-world" at the International Dateline.</li>
		<li>Spatial data is retrieved and cached locally, allowing maps to be used in offline situations, with no loss of interactivity.</li>
	</ul>
</details>

### FAQs

How does <span>Thematic Earth</span> stack up to other GIS software?
What type of spatial data can be used? What are the front-end, back-end, and
network prerequisites?


<details>
	<summary>Questions and answers . . .</summary>
	<h4>Capabilities</h4>
	<dl>
		<dt>How does the <span class=product>Thematic Earth</span> web component compare to desktop applications like ArcGIS or QGIS?</dt>
		<dd>ArcGIS and QGIS are both full fledged "geographic information systems" capable of digitizing new spatial data files and performing spatial analyses.</dd>
		<dd>The <span class=product>Thematic Earth</span> web component is capable of <i>visualizing</i> spatial data online and <i>styling</i> spatial layers with symbolic specifiers, but not digitizing new spatial data or performing spatial analyses.</dd>
		<dt>How does the <span class=product>Thematic Earth</span> web component compare to Enterprise GIS or Web GIS?</dt>
		<dd>Enterprise GIS refers to a centralized cloud-based delivery mechanism where large spatial databases are shared by multiple users and applications. Its complement is Web GIS, which refers to map software that runs in a browser and retrieves spatial data through an enterprise server connection.</dd>
		<dd>The <span class=product>Thematic Earth</span> web component is similar to Web GIS software, but it works <i>without</i> a back-end enterprise server connection.</dd>
		<dt>How does the <span class=product>Thematic Earth</span> web component compare to maps saved as PNG, JPEG or SVG images?</dt>
		<dd>Image files contain a frozen representation of routes and places within a predetermined bounding box.</dd>
		<dd>The <span class=product>Thematic Earth</span> web component dynamically renders interactive maps, with variable scale and perspective, that users can freely pan, zoom, reposition, and rotate.</dd>
		<dt>How does the <span class=product>Thematic Earth</span> web component compare to Google Maps or Apple Maps?</dt>
		<dd>Google Maps and Apple Maps are principally GPS navigation tools, allowing users to search and locate commercial, administrative, and natural features.</dd>
		<dd>The <span class=product>Thematic Earth</span> web component is principally an information vizualization tool, allowing users to explore and compare layers of spatial data based on attributes and their values.</dd>
	</dl>
	<h4>Spatial data files</h4>
	<dl>
		<dt>Can <span class=product>Thematic Earth</span> maps use <a href='https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf'>ESRI shapefiles</a> (SHP)?</dt>
		<dd>Not directly. ESRI shapefiles are a collection of three or more files that together support many types of geometries. Many of these can be converted to <a href='https://geojson.org/'>geoJSON</a> files, which <i>can</i> be used by <span class=product>Thematic Earth</span>, using Mike Bostock's <a href='https://github.com/mbostock/shapefile'>shapefile converter</a>.</dd>
		<dt>Can <span class=product>Thematic Earth</span> maps use <a href='https://www.ogc.org/'>Open Geospatial Consortium</a> GeoPackage (GPKG) files?</dt>
		<dd>Not directly, however <a href='https://www.geopackage.org/'>GeoPackage</a> <i>vector</i> datasets (but not <i>raster</i> datasets) can be converted to geoJSON files using the <a href='https://gdal.org/download.html'>GDAL/OGR converter</a> from the <a href='https://www.osgeo.org/'>Open Source Geospatial Foundation</a>.</dd>
		<dt>Can <span class=product>Thematic Earth</span> maps use Keyhole Markup Language (KML/KMZ) files?</dt>
		<dd>Not directly. Most point, line and polygon features encoded in KML files can be converted to geoJSON using the Mapbox <a href='https://github.com/mapbox/togeojson'>toGeoJSON</a> Node.js converter. NetworkLinks and GroundOverlays cannot be converted to geoJSON.</dd>
		<dt>Can <span class=product>Thematic Earth</span> maps use <a href='https://www.openstreetmap.org/'>Open Street Map</a> (OSM) Protocolbuffer Binary Format (PBF) files?</dt>
		<dd>Not directly. Selected areas of Open Street Map data can be downloaded from <a href='https://download.geofabrik.de/'>GeoFrabrik</a> and converted to geoJSON using Martin Raifer's <a href='https://github.com/tyrasd/osmtogeojson'>osmtogeojson</a> Node.js utility. (Open Street Map <i>tiles</i> are not supported.)</dd>
		<dt>Does <span class=product>Thematic Earth</span> software support any <i>binary</i> spatial data file format?</dt>
		<dd>
			<span>Three special binary file formats can be used to efficiently transfer spatial data:</span>
			<ul>
				<li>gfebin - Geographic Feature Encoding</li>
				<li>icebin - Indexed Coordinate Encoding</li>
				<li>taebin - Topological Arc Encoding</li>
			</ul>
			<span>Geojson files can be converted to each of these formats using the <a href='https://hub.readwritetools.com/libs/gcslib.blue'>GCSLIB</a> library or the <a href='https://hub.readwritetools.com/tasks/gcsio.blue'>GCS I/O</a> Node.js utility.</span>
		</dd>
		<dt>Can the <span class=product>Thematic Earth</span> software read map tiles from a GIS server.</dt>
		<dd>No, <span class=product>Thematic Earth</span> retrieves and caches spatial data files in their entirety. Continuous data feeds from enterprise GIS servers, based on a scaling factor and a geographic coordinate, are not supported.</dd>
	</dl>
	<h4>Infrastructure</h4>
	<dl>
		<dt>How does the <span class=product>Thematic Earth</span> software access spatial data?</dt>
		<dd>Spatial data files are pulled from remote servers using standard HTTP methods, cached in the user's browser using instructions specified in the response headers, and reused on subsequent page visits according to the HTTP caching specification (<a href='https://www.ietf.org/rfc/rfc9111.txt'>RFC 9111</a>).</dd>
		<dt>Is there a central repository for <span class=product>Thematic Earth</span> spatial data?</dt>
		<dd>There is no master storage vault for data; no fees for using public domain data; no restrictions on your own data. Spatial data files can be accessed from any HTTP accessible endpoint. The <span class=product>Thematic Earth</span> software has built-in metadata features to allow proper attribution and citation of third party data.</dd>
		<dt>What are the back-end requirements for web pages with embedded <span class=product>Thematic Earth</span> maps?</dt>
		<dd>Any HTTP web server will work, but HTTP/2 is strongly recommended.</dd>
		<dd>Spatial data files should be compressed, ideally with <i>brotli</i> (<a href='https://www.ietf.org/rfc/rfc7932.txt'>RFC 7932 </a>) or <i>GZIP</i> (<a href='https://www.ietf.org/rfc/rfc1952.txt'>RFC 1952</a>).</dd>
		<dd>Static spatial layers should be served with extended cache expiration dates. Spatial layers that are subject to frequent changes should be served with shorter cache expiration dates.</dd>
		<dt>What are the front-end requirements for web pages with embedded <span class=product>Thematic Earth</span> maps?</dt>
		<dd>The user's browser must have JavaScript enabled. (No third-party frameworks, libraries, loaders, or bundlers are necessary.)</dd>
		<dd>The <span class=product>Thematic Earth</span> web component is framework agnostic, and may be used with single page applications that use popular front-end frameworks like Angular, Vue, React, Svelte, etc.</dd>
		<dt>Can a <span class=product>Thematic Earth</span> map obtain spatial data from third-party servers?</dt>
		<dd>Yes, <span class=product>Thematic Earth</span> maps can be rendered from any remote endpoint that has correctly configured CORS to allow cross-domain requests from the original back-end server.</dd>
	</dl>
</details>

### Hello World

What do the declarations, markup, and initialization code look like for a <span>
Thematic Earth</span> map?


<details>
	<summary>HTML markup . . .</summary>
	<p>The HTML markup for an interactive map of the world:</p>
	<pre lang=html>
&lt;!DOCTYPE html&gt;<br />&lt;html&gt;<br />    &lt;head&gt;<br />        &lt;title&gt;Hello World&lt;/title&gt;<br />        &lt;meta name=viewport content='width=device-width, initial-scale=1' /&gt;<br />        &lt;link href='./example.css' rel='stylesheet' /&gt;<br />    &lt;/head&gt;<br />    &lt;body&gt;<br />        &lt;thematic-earth id=earth panels="interaction point-of-reference map-scale layers locate"&gt;&lt;/thematic-earth&gt;<br />    &lt;/body&gt;<br />    &lt;script src='/node_modules/thematic-earth/element.js' type=module&gt;&lt;/script&gt;<br />    &lt;script src='./example.js' type=module&gt;&lt;/script&gt;<br />&lt;/html&gt;<br />	</pre>
	<figcaption><code>example.html</code></figcaption>
</details>


<details>
	<summary>CSS declarations . . .</summary>
	<p>CSS declarations to resize the map to fit the entire page:</p>
	<pre lang=css>
body {<br />    display: flex;<br />    position: absolute;<br />    width: 100%;<br />    height: 100%;<br />    margin: 0;<br />}<br />thematic-earth {<br />    height: 100%;<br />    width: 100%;<br />}<br />	</pre>
	<figcaption><code>example.css</code></figcaption>
</details>


<details>
	<summary>JavaScript initialization . . .</summary>
	<p>JavaScript to add map layers, add TESS declarations, and set the point of observation:</p>
	<pre lang=javascript>
var earth = document.getElementById('earth');<br />var promise = earth.waitOnLoading();<br />promise.then(() =&gt; {<br />    earth.addMapItem({<br />        spatialDataType: 'sphere',<br />        tessIdentifier: 'earth',<br />        layerName: 'Earth'<br />    });<br />    earth.addMapItem({<br />        spatialDataType: 'gcs',<br />        tessIdentifier: 'land',<br />        layerName: 'Land',<br />        url: './seven-continents.gfebin'<br />    });<br />    earth.addMapItem({<br />        spatialDataType: 'night',<br />        layerName: 'Night &amp; Day'<br />    });<br />    earth.addMapItem({<br />        spatialDataType: 'graticule',<br />        parallelFrequency: 5,<br />        meridianFrequency: 5,<br />        layerName: 'Lat/Lng Grid'<br />    });<br />    earth.addMapItem({<br />        spatialDataType: 'named-meridians',<br />        layerName: 'Prime Meridian &amp; Dateline',<br />        namedMeridians: { "Prime Meridian": 0, "Intl. Dateline": 180 }<br />    });<br />    earth.addMapItem({<br />        spatialDataType: 'named-parallels',<br />        layerName: 'Equator',<br />        namedParallels: { "Equator": 0 }<br />    });<br />    earth.addTessFile('./example.tess');<br />    earth.setTangentLatitude(29.0);<br />    earth.setTangentLongitude(-24.0);<br />});<br />	</pre>
	<figcaption><code>example.js</code></figcaption>
</details>


<details>
	<summary>TESS declarations . . .</summary>
	<p>Thematic Earth Symbol Specifier (TESS) declarations for the map:</p>
	<pre lang=css>
#earth {<br />    fill-color: #34a1eb;<br />}<br />#land {<br />    stroke-color: #333;<br />    stroke-width: 0.5;<br />    fill-color: rgba(240, 213, 125, 0.51);<br />    fill-gradient: radial;<br />    fg-saturation: 200;<br />}<br />.named-parallels['Equator'] {<br />    stroke-color: #f33;<br />}<br />.named-meridians["Prime Meridian"],<br />.named-meridians["Intl. Dateline"] {<br />    stroke-color: #025bc2;<br />    stroke-width: 3;<br />    stroke-type: dots;<br />}<br />	</pre>
	<figcaption><code>example.tess</code></figcaption>
</details>

### Configuration

<span>Thematic Earth</span> mapping software can be configured by
adding optional attributes to the `<thematic-earth>` element tag.


<details>
	<summary>Element attributes . . .</summary>
	<dl>
		<dt><code>geolocation</code></dt>
		<dd>Used to set the initial latitude, longitude and place of interest.</dd>
		<dd>
			<ul>
				<li><code>'off'</code> [default] set initial longitude, latitude and place of interest to (0.0, 0.0) and honor explicit <code>setTangentLongitude</code>, <code>setTangentLatitude</code>, <code>setPlaceOfInterest</code> API calls.</li>
				<li><code>'on'</code> use the browser's geolocation beacon to set initial longitude, latitude and place of interest.</li>
				<li><code>'timezone'</code> use the browser's current time to determine the map's initial longitude.</li>
			</ul>
		</dd>
		<dt><code>menu-state</code></dt>
		<dd>Used to set the initial state of the toolbar.</dd>
		<dd>
			<ul>
				<li><code>closed</code> [default] The toolbar menu should initially be collapsed.</li>
				<li><code>open</code> The toolbar menu should initially be expanded.</li>
			</ul>
		</dd>
		<dt><code>menu-corner</code></dt>
		<dd>Used to position the toolbar's location relative to the component's canvas area.</dd>
		<dd>
			<ul>
				<li><code>top-right</code> [default]</li>
				<li><code>top-left</code></li>
				<li><code>bottom-right</code></li>
				<li><code>bottom-left</code></li>
			</ul>
		</dd>
		<dt><code>shortcut</code></dt>
		<dd>Defines which keyboard function key activates the toolbar; something like F1, F2, F3, etc.</dd>
		<dt><code>panels</code></dt>
		<dd>Declares the presence and order of which menu panels to activate; a space separated list of these keywords:</dd>
		<dd>
			<ul>
				<li><code>none</code> [default] Hide all menu panels.</li>
				<li><code>interaction</code> Mouse gestures for manipulation and interaction.</li>
				<li><code>legend</code> Show the legend.</li>
				<li><code>season</code> Change the reference date.</li>
				<li><code>time-of-day</code> Change the time of day.</li>
				<li><code>equation-of-time</code> The variance between mean solar noon and actual solar noon.</li>
				<li><code>solar-events</code> The time of sunrise, solar noon, and sunset.</li>
				<li><code>geocentric-coords</code> The Earth's declination and right ascension for the current date and time.</li>
				<li><code>topocentric-coords</code> The position of the sun for the current location and time.</li>
				<li><code>point-of-reference</code> Change the longitude/latitude of the observation point.</li>
				<li><code>map-scale</code> Change the map's scale.</li>
				<li><code>space</code> Shift the space point of view.</li>
				<li><code>canvas</code> Shift the canvas origin.</li>
				<li><code>layers</code> Choose which layers to display.</li>
				<li><code>locate</code> Display longitude and latitude of mouse position.</li>
				<li><code>discover</code> Discover features a pointer position.</li>
				<li><code>identify</code> Identify underlying feature details.</li>
				<li><code>select</code> Highlight features.</li>
				<li><code>distance</code> Display distances along great-circle arcs.</li>
				<li><code>time-lapse</code> Rotate the earth at a set speed.</li>
				<li><code>snapshot</code> Capture and download an image of the map.</li>
				<li><code>metadata</code> Show map citations, data sources, software version, and licensing links.</li>
				<li><code>symbol-specifier</code> Interactive manipulation of Thematic Earth Symbol Specifiers.</li>
				<li><code>signals</code> Monitor system broadcasters and receivers.</li>
			</ul>
		</dd>
		<dt><code>package</code></dt>
		<dd>A URL pointing to a Thematic Earth Package, which defines the initial configuration, settings, data layers, legends, TESS declarations, and other packages to use.</dd>
	</dl>
</details>

### Events

<span>Thematic Earth</span> mapping software dispatches messages that
JavaScript can monitor and hook into through the component's `addEventListener` method.



<details>
	<summary>Element notifications . . .</summary>
	<dl>
		<dt><code>component/loaded</code></dt>
		<dd>Sent when the component is fully loaded and ready to be used. As a convenience you can use the <code>waitOnLoading()</code> method which returns a promise that resolves when the <code>component-loaded</code> event is received. Call this asynchronously with <code>await</code>.</dd>
		<dt><code>package/packageAdded</code></dt>
		<dd>Confirmation that a Thematic Earth Pacakge has been added to the catalog.</dd>
		<dt><code>catalog/layerAdded</code></dt>
		<dd>Confirmation that a layer has been added to the catalog.</dd>
		<dt><code>catalog/spatialFileAdded</code></dt>
		<dd>Confirmation that a spatial file has been added to the catalog.</dd>
		<dt><code>visualization/tessRulesAdded</code></dt>
		<dd>Confirmation that a TESS declaration file has been added.</dd>
		<dt><code>greatCircles/distanceFeatureAdded</code></dt>
		<dd>Confirmation that a great circle route has been added to the map.</dd>
		<dt><code>user/latitudeLongitude</code></dt>
		<dd>Response containing the geographic coordinates under the mouse pointer's current position.</dd>
		<dt><code>user/discoveredFeatures</code></dt>
		<dd>Response containing the list of features forwarded to the 'discover' menu panel when the user hovers over a map feature.</dd>
		<dt><code>user/identifiedFeatures</code></dt>
		<dd>Response containing the list of features forwarded to the 'identify' menu panel when the user &lt;shift&gt; clicks on the map.</dd>
		<dt><code>user/selectedFeatures</code></dt>
		<dd>Response containing the list of features forwarded to the 'selection' menu panel when the user &lt;ctrl&gt; clicks on the map.</dd>
		<dt><code>user/chosenFeature</code></dt>
		<dd>Response containing the list of features forwarded to the 'symbol-specifier' menu panel when the user &lt;s&gt; clicks on the map.</dd>
	</dl>
</details>

### Beta Testing Program

The <span>Thematic Earth</span> mapping software is currently being
distributed through a Beta Testing Program.


<details>
	<summary>Beta Testing Program licensing and cost . . .</summary>
	<p>By downloading, installing or using this software you agree to be part of the Beta Testing Program. There is no cost to join. To obtain a license key and join the Program provide your name and email address using this form:</p>
	<p style=text-align:center><a href='https://readwritetools.com/beta-testing-program.blue?product=thematic-earth'>Join the Beta Testing Program</a></p>
	<p>As part of the Beta Testing Program you agree to report any bugs found, any missing or inaccurate documentation, and any usability concerns you discover. You agree to be contacted by Read Write Tools to clarify any information you provide to us as part of the Program.</p>
	<p>During this pre-release phase, <i>new features may be added, existing features may change or be removed, and the application programming interface (API) may change from one release to the next.</i></p>
	<p>The Beta Testing Program will terminate when the software has reached a stable state. By joining the Program you agree to discontinue use of the pre-release software within 90 days of the Program's termination.</p>
	<p>This software is not freeware. There will be a licensing fee for continued use upon termination of the Program.</p>
	<img class=license src='/img/blue-seal-premium-software.png' width=80 align=right />
	<details class=license>
		<summary>Thematic Earth Software License Agreement</summary>
		<p>Copyright © 2023 Read Write Tools.</p>
		<ol>
			<li>This Software License Agreement ("Agreement") is a legal contract between you and Read Write Tools ("RWT"). The "Materials" subject to this Agreement include the "Thematic Earth" software and associated documentation.</li>
			<li>By using these Materials, you agree to abide by the terms and conditions of this Agreement.</li>
			<li>The Materials are protected by United States copyright law, and international treaties on intellectual property rights. The Materials are licensed, not sold to you, and can only be used in accordance with the terms of this Agreement. RWT is and remains the owner of all titles, rights and interests in the Materials, and RWT reserves all rights not specifically granted under this Agreement.</li>
			<li>Subject to the terms of this Agreement, RWT hereby grants to you a limited, non-exclusive license to use the Materials subject to the following conditions:</li>
			<ul>
				<li>You may not distribute, publish, sub-license, sell, rent, or lease the Materials.</li>
				<li>You may not decompile or reverse engineer any source code included in the software.</li>
				<li>You may not modify or extend any source code included in the software.</li>
				<li>Your license to use the software is limited to the purpose for which it was originally intended, and does not include permission to extract, link to, or use parts on a separate basis.</li>
			</ul>
			<li>Each paid license allows use of the Materials under one "Fair Use Setting". Separate usage requires the purchase of a separate license. Fair Use Settings include, but are not limited to: eBooks, mobile apps, desktop applications and websites. The determination of a Fair Use Setting is made at the sole discretion of RWT. For example, and not by way of limitation, a Fair Use Setting may be one of these:</li>
			<ul>
				<li>An eBook published under a single title and author.</li>
				<li>A mobile app for distribution under a single app name.</li>
				<li>A desktop application published under a single application name.</li>
				<li>A website published under a single domain name. For this purpose, and by way of example, the domain names "alpha.example.com" and "beta.example.com" are considered to be separate websites.</li>
				<li>A load-balanced collection of web servers, used to provide access to a single website under a single domain name.</li>
			</ul>
			<li>THE MATERIALS ARE PROVIDED BY READ WRITE TOOLS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL READ WRITE TOOLS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</li>
			<li>This license is effective for a one year period from the date of purchase or until terminated by you or Read Write Tools. Continued use, publication, or distribution of the Materials after the one year period, under any of this Agreement's Fair Use Settings, is subject to the renewal of this license.</li>
			<li>Products or services that you sell to third parties, during the valid license period of this Agreement and in compliance with the Fair Use Settings provision, may continue to be used by third parties after the effective period of your license.</li>
			<li>If you decide not to renew this license, you must remove the software from any eBook, mobile app, desktop application, web page or other product or service where it is being used.</li>
			<li>Without prejudice to any other rights, RWT may terminate your right to use the Materials if you fail to comply with the terms of this Agreement. In such event, you shall uninstall and delete all copies of the Materials.</li>
			<li>This Agreement is governed by and interpreted in accordance with the laws of the State of California. If for any reason a court of competent jurisdiction finds any provision of the Agreement to be unenforceable, that provision will be enforced to the maximum extent possible to effectuate the intent of the parties and the remainder of the Agreement shall continue in full force and effect.</li>
		</ol>
	</details>
</details>

### Installation

Where to get the software, and how to activate your license.


<details>
	<summary>Downloading and activating the software . . .</summary>
	<table>
		<tr><td><img src='/img/48x48/read-write-hub.png' alt='DOM components logo' width=48 /></td>	<td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/components/thematic-earth.blue'>READ WRITE HUB</a></td></tr>
		<tr><td><img src='/img/48x48/git.png' alt='git logo' width=48 /></td>	<td>Minified source code</td> <td><a href='https://github.com/readwritetools/thematic-earth'>github</a></td></tr>
		<tr><td><img src='/img/48x48/dom-components.png' alt='DOM components logo' width=48 /></td>	<td>Component catalog</td> 	<td><a href='https://domcomponents.com/components/thematic-earth.blue'>DOM COMPONENTS</a></td></tr>
		<tr><td><img src='/img/48x48/npm.png' alt='npm logo' width=48 /></td>	<td>Package installation</td> <td><a href='https://www.npmjs.com/package/thematic-earth'>npm</a></td></tr>
		<tr><td><img src='/img/48x48/read-write-stack.png' alt='Read Write Stack logo' width=48 /></td>	<td>Publication venue</td>	<td><a href='https://readwritestack.com/components/thematic-earth.blue'>READ WRITE STACK</a></td></tr>
	</table>
	<h4 id=activation>Activation</h4>
	<p>To activate your license, copy the <code>rwt-registration-keys.js</code> file to the <i>root directory of your website</i>, providing the <code>customer-number</code> and <code>access-key</code> sent to your email address, and replacing <code>example.com</code> with your website's hostname. Follow this example:</p>
	<pre>
export default [{<br />    "product-key": "thematic-earth",<br />    "registration": "example.com",<br />    "customer-number": "CN-xxx-yyyyy",<br />    "access-key": "AK-xxx-yyyyy"<br />}]<br />	</pre>
	<h4>Metadata</h4>
	<h5>Module exports</h5>
	<table>
		<tr><td>ES modules</td> 		<td>true</td></tr>
		<tr><td>Common JS</td> 		<td>false</td></tr>
	</table>
	<h5>Suitability</h5>
	<table>
		<tr><td>Browser</td> 			<td>API</td></tr>
		<tr><td>node.js</td> 			<td>none</td></tr>
	</table>
</details>

