# How to add Data

The data for the Sections 'Agenda', 'Partner' and 'Gallery' are inserted into the webpage using JavaScript. The 
Script will take the data when specified as outlined below. You can verify the XML Files with the corresponding XSD 
Schemas.


## Agenda

Every entry in the agenda is defined in the [agenda.xml](data/agenda.xml) file and follows the structure below:

    <entry>
      <title></title>
      <date from="yyyy-MM-dd" to="yyyy-MM-dd" time="hh:mm"/>
      <location name="">
        <street></street>
        <plz></plz>
        <city></city>
      </location>
      <description></description>
    </entry>

## Partner
You can specify two types of partner

* Sponsor
* Friend

Both are defined in [partner.xml](data/partner.xml) and follow the ourline below:

	<sponsor>
	  <title>Raiffeisen</title>
	  <image>raiffeisen.png</image>
	  <url>www.raiffeisen.ch/wohlen</url>
	</sponsor>
	
	<friend>
      <title>Eisenbahn-Modellbau-Club Aarau</title>
      <image>emca.png</image>
      <url>www.emcaarau.ch</url>
    </friend>

## Gallery

The images for the gallery need to be stored in images/gallery/. The corresponding entries are then stored in 
[gallery.xml](data/gallery.xml) as follows:


	<slide>
	  <title>Spur 0</title>
      <image>feac-5.jpg</image>
	</slide>

