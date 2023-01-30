html












<figure>
	<img src='/img/libs/gcslib/gcslib.png' width='100%' />
	<figcaption></figcaption>
</figure>

##### Thematic Earth

# GCSLIB

## Parsing and Serializing GCS Strings


<address>
<img src='/img/48x48/rwtools.png' /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2022-02-03>Feb 3, 2022</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>The <span class=product>gcslib</span> JavaScript library is for parsing and serializing Geographic Coordinate System encoded strings and buffers. It serves as a GIS exchange format for points, lines, and polygons that use longitude/latitude coordinates.</td></tr>
</table>

### Motivation

The creation of this library and CLI was motivated by the desire to create GIS
shape files that can be downloaded by website visitors in a highly compressed
format.

### Summary

The `gcslib` package is a core JavaScript library used by the Geoplex package, the
GCSIO command line tool, and the Thematic Earth web component.

Supported input and output formats comprise:

   * geojson - RFC 7946
   * gfe - Geographic Feature Encoding
   * ice - Indexed Coordinate Encoding
   * tae - Topological Arc Encoding
   * gfebin - Geographic Feature Encoding binary
   * icebin - Indexed Coordinate Encoding binary
   * taebin - Topological Arc Encoding binary

The JavaScript API reads from and writes to standard ECMAScript Strings and
ArrayBuffers.

The API does not access the host computer's file system, so it can be used with
client facing web pages that obtain data using HTTP.

See also: The GCSIO CLI tool which uses the node.js filesystem package to read
and write files using the API's exported functions.

### Installation

The <span>gcslib</span> library may be installed directly from github or via
NPM.

#### Browser

To install and use the API

```bash
[user@host]# git clone https://github.com/readwritetools/gcslib.git
```

Sample web frontend to fetch and parse an ICE file into memory:

```javascript
import API from 'node_modules/gcslib/api/user-api.js'
import GcsHoldingArea from 'node_modules/gcslib/gcs/gcs-holding-area.class.js'
    
var response = await fetch("https://example.com/my-dataset.ice");
var payload = await response.text();

var gcsHoldingArea = new GcsHoldingArea();
var options = {
    inputFormat: "ice",
    datasetId: "myDataset",
    properties: "all"
};

if (API.parseIce(gcsHoldingArea, payload, options) == true) {
    // gcsHoldingArea now contains the parsed features with their geometries and properties.
}
```

### Metadata

#### Dependencies

This library depends on <a href='https://www.npmjs.com/package/softlib'>softlib</a>
.

#### Module exports


<table>
	<tr><td>ES modules</td> 		<td>true</td></tr>
	<tr><td>Common JS</td> 		<td>false</td></tr>
</table>

#### Suitability


<table>
	<tr><td>Browser</td> 			<td>API</td></tr>
	<tr><td>node.js</td> 			<td>API</td></tr>
</table>

#### Availability


<table>
	<tr><td><img src='/img/48x48/read-write-hub.png' alt='Read Write Hub logo' width=48 /></td>	<td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/libs/gcslib.blue'>Read Write Hub</a></td></tr>
	<tr><td><img src='/img/48x48/git.png' alt='git logo' width=48 /></td>	<td>Source code</td> 			<td><a href='https://github.com/readwritetools/gcslib'>github</a></td></tr>
	<tr><td><img src='/img/48x48/npm.png' alt='npm logo' width=48 /></td>	<td>Package installation</td> <td><a href='https://www.npmjs.com/package/gcslib'>npm</a></td></tr>
</table>

#### License

The <span>gcslib</span> library is not freeware. After evaluating it and
before using it in a public-facing website, eBook, mobile app, or desktop
application, you must obtain a license from <a href='https://readwritetools.com/licensing.blue'>Read Write Tools</a>
as part of the <a href='https://hub.readwritetools.com/components/thematic-earth.blue'>thematic-earth</a>
DOM Component.

<img src='/img/blue-seal-premium-software.png' width=80 align=right />

<details>
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

