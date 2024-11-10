import React, { useState, useEffect, useRef } from 'react';
import { CrossIcon  } from 'lucide-react';

const CityRegionSearch = ({ onSelect, onClicked }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Sample data - replace with your actual data source
    const locations = [
        {
            "type": "City",
            "value": "Addington Highlands"
        },
        {
            "type": "City",
            "value": "Adelaide Metcalfe"
        },
        {
            "type": "City",
            "value": "Adjala-Tosorontio"
        },
        {
            "type": "City",
            "value": "Admaston/Bromley"
        },
        {
            "type": "City",
            "value": "Ajax"
        },
        {
            "type": "City",
            "value": "Alfred & Plantagenet"
        },
        {
            "type": "City",
            "value": "Alfred and Plantagenet"
        },
        {
            "type": "City",
            "value": "Algoma Remote Area"
        },
        {
            "type": "City",
            "value": "Algonquin Highlands"
        },
        {
            "type": "City",
            "value": "Alnwick/Haldimand"
        },
        {
            "type": "City",
            "value": "Alta Vista and Area"
        },
        {
            "type": "City",
            "value": "Amaranth"
        },
        {
            "type": "City",
            "value": "Amherstburg"
        },
        {
            "type": "City",
            "value": "Armour"
        },
        {
            "type": "City",
            "value": "Armstrong"
        },
        {
            "type": "City",
            "value": "Arnprior"
        },
        {
            "type": "City",
            "value": "Arran-Elderslie"
        },
        {
            "type": "City",
            "value": "Ashfield-Colborne-Wawanosh"
        },
        {
            "type": "City",
            "value": "Asphodel-Norwood"
        },
        {
            "type": "City",
            "value": "Assiginack"
        },
        {
            "type": "City",
            "value": "Athens"
        },
        {
            "type": "City",
            "value": "Atikokan"
        },
        {
            "type": "City",
            "value": "Augusta"
        },
        {
            "type": "City",
            "value": "Aurora"
        },
        {
            "type": "City",
            "value": "Aylmer"
        },
        {
            "type": "City",
            "value": "Bancroft"
        },
        {
            "type": "City",
            "value": "Barbados"
        },
        {
            "type": "City",
            "value": "Barrhaven"
        },
        {
            "type": "City",
            "value": "Barrie"
        },
        {
            "type": "City",
            "value": "Bayham"
        },
        {
            "type": "City",
            "value": "Beacon Hill North - South and Area"
        },
        {
            "type": "City",
            "value": "Beckwith"
        },
        {
            "type": "City",
            "value": "Belair Park - Copeland Park and Area"
        },
        {
            "type": "City",
            "value": "Belleville"
        },
        {
            "type": "City",
            "value": "Bells Corners and South to Fallowfield"
        },
        {
            "type": "City",
            "value": "Billings"
        },
        {
            "type": "City",
            "value": "Billings Bridge - Riverside Park and Area"
        },
        {
            "type": "City",
            "value": "Black River-Matheson"
        },
        {
            "type": "City",
            "value": "Blackburn Hamlet"
        },
        {
            "type": "City",
            "value": "Blandford-Blenheim"
        },
        {
            "type": "City",
            "value": "Blind River"
        },
        {
            "type": "City",
            "value": "Blossom Park - Airport and Area"
        },
        {
            "type": "City",
            "value": "Blue Mountains"
        },
        {
            "type": "City",
            "value": "Bluewater"
        },
        {
            "type": "City",
            "value": "Bonfield"
        },
        {
            "type": "City",
            "value": "Bonnechere Valley"
        },
        {
            "type": "City",
            "value": "Bracebridge"
        },
        {
            "type": "City",
            "value": "Bradford West Gwillimbury"
        },
        {
            "type": "City",
            "value": "Brampton"
        },
        {
            "type": "City",
            "value": "Brant"
        },
        {
            "type": "City",
            "value": "Brantford"
        },
        {
            "type": "City",
            "value": "Brighton"
        },
        {
            "type": "City",
            "value": "Britannia - Lincoln Heights and Area"
        },
        {
            "type": "City",
            "value": "Britannia Heights - Queensway Terrace N and Area"
        },
        {
            "type": "City",
            "value": "Brock"
        },
        {
            "type": "City",
            "value": "Brockton"
        },
        {
            "type": "City",
            "value": "Brockville"
        },
        {
            "type": "City",
            "value": "Brooke-Alvinston"
        },
        {
            "type": "City",
            "value": "Bruce Mines"
        },
        {
            "type": "City",
            "value": "Brudenell, Lyndoch and Raglan"
        },
        {
            "type": "City",
            "value": "Burk's Falls"
        },
        {
            "type": "City",
            "value": "Burlington"
        },
        {
            "type": "City",
            "value": "Caledon"
        },
        {
            "type": "City",
            "value": "Callander"
        },
        {
            "type": "City",
            "value": "Calvin"
        },
        {
            "type": "City",
            "value": "Cambridge"
        },
        {
            "type": "City",
            "value": "Carleton Place"
        },
        {
            "type": "City",
            "value": "Carling"
        },
        {
            "type": "City",
            "value": "Carlington - Central Park"
        },
        {
            "type": "City",
            "value": "Carlingwood - Westboro and Area"
        },
        {
            "type": "City",
            "value": "Carlow/Mayo"
        },
        {
            "type": "City",
            "value": "Carlsbad Springs"
        },
        {
            "type": "City",
            "value": "Carp - Dunrobin - Huntley - Fitzroy and Area"
        },
        {
            "type": "City",
            "value": "Carp - Huntley Ward"
        },
        {
            "type": "City",
            "value": "Casselman"
        },
        {
            "type": "City",
            "value": "Cavan Monaghan"
        },
        {
            "type": "City",
            "value": "Central Elgin"
        },
        {
            "type": "City",
            "value": "Central Frontenac"
        },
        {
            "type": "City",
            "value": "Central Huron"
        },
        {
            "type": "City",
            "value": "Central Manitoulin"
        },
        {
            "type": "City",
            "value": "Centre Hastings"
        },
        {
            "type": "City",
            "value": "Centre Wellington"
        },
        {
            "type": "City",
            "value": "Champlain"
        },
        {
            "type": "City",
            "value": "Chapleau"
        },
        {
            "type": "City",
            "value": "Charlton and Dack"
        },
        {
            "type": "City",
            "value": "Chatham-Kent"
        },
        {
            "type": "City",
            "value": "Chatsworth"
        },
        {
            "type": "City",
            "value": "Chisholm"
        },
        {
            "type": "City",
            "value": "Christian Island 30"
        },
        {
            "type": "City",
            "value": "Cityview - Parkwoods Hills - Rideau Shore"
        },
        {
            "type": "City",
            "value": "Clarence-Rockland"
        },
        {
            "type": "City",
            "value": "Clarington"
        },
        {
            "type": "City",
            "value": "Clearview"
        },
        {
            "type": "City",
            "value": "Cobalt"
        },
        {
            "type": "City",
            "value": "Cobourg"
        },
        {
            "type": "City",
            "value": "Cochrane"
        },
        {
            "type": "City",
            "value": "Cochrane Remote Area"
        },
        {
            "type": "City",
            "value": "Coleman"
        },
        {
            "type": "City",
            "value": "Collingwood"
        },
        {
            "type": "City",
            "value": "Constance Bay - Dunrobin - Kilmaurs - Woodlawn"
        },
        {
            "type": "City",
            "value": "Cornwall"
        },
        {
            "type": "City",
            "value": "Costa Rica"
        },
        {
            "type": "City",
            "value": "Country Place - Pineglen - Crestview and Area"
        },
        {
            "type": "City",
            "value": "Cramahe"
        },
        {
            "type": "City",
            "value": "Crystal Bay - Rocky Point - Bayshore"
        },
        {
            "type": "City",
            "value": "Curve Lake First Nation 35"
        },
        {
            "type": "City",
            "value": "Cyrville - Carson Grove - Pineview"
        },
        {
            "type": "City",
            "value": "Deep River"
        },
        {
            "type": "City",
            "value": "Deseronto"
        },
        {
            "type": "City",
            "value": "Dominican"
        },
        {
            "type": "City",
            "value": "Douro-Dummer"
        },
        {
            "type": "City",
            "value": "Dows Lake - Civic Hospital and Area"
        },
        {
            "type": "City",
            "value": "Drummond/North Elmsley"
        },
        {
            "type": "City",
            "value": "Dryden"
        },
        {
            "type": "City",
            "value": "Dutton/Dunwich"
        },
        {
            "type": "City",
            "value": "Dysart et al"
        },
        {
            "type": "City",
            "value": "East Ferris"
        },
        {
            "type": "City",
            "value": "East Garafraxa"
        },
        {
            "type": "City",
            "value": "East Gwillimbury"
        },
        {
            "type": "City",
            "value": "East Hawkesbury"
        },
        {
            "type": "City",
            "value": "East Luther Grand Valley"
        },
        {
            "type": "City",
            "value": "East Zorra-Tavistock"
        },
        {
            "type": "City",
            "value": "Edwardsburgh/Cardinal"
        },
        {
            "type": "City",
            "value": "Elizabethtown-Kitley"
        },
        {
            "type": "City",
            "value": "Elliot Lake"
        },
        {
            "type": "City",
            "value": "Elmvale Acres and Area"
        },
        {
            "type": "City",
            "value": "Emo"
        },
        {
            "type": "City",
            "value": "Enniskillen"
        },
        {
            "type": "City",
            "value": "Erin"
        },
        {
            "type": "City",
            "value": "Espanola"
        },
        {
            "type": "City",
            "value": "Essa"
        },
        {
            "type": "City",
            "value": "Essex"
        },
        {
            "type": "City",
            "value": "Fallowfield Rd South of Ottawa"
        },
        {
            "type": "City",
            "value": "Faraday"
        },
        {
            "type": "City",
            "value": "Fauquier-Strickland"
        },
        {
            "type": "City",
            "value": "First Nations"
        },
        {
            "type": "City",
            "value": "Florida  Usa"
        },
        {
            "type": "City",
            "value": "Fort Erie"
        },
        {
            "type": "City",
            "value": "France"
        },
        {
            "type": "City",
            "value": "French River"
        },
        {
            "type": "City",
            "value": "Front of Yonge"
        },
        {
            "type": "City",
            "value": "Frontenac Islands"
        },
        {
            "type": "City",
            "value": "Galway-Cavendish and Harvey"
        },
        {
            "type": "City",
            "value": "Gananoque"
        },
        {
            "type": "City",
            "value": "Gauthier"
        },
        {
            "type": "City",
            "value": "Georgian Bay"
        },
        {
            "type": "City",
            "value": "Georgian Bluffs"
        },
        {
            "type": "City",
            "value": "Georgina"
        },
        {
            "type": "City",
            "value": "Georgina Islands"
        },
        {
            "type": "City",
            "value": "Glebe - Ottawa East and Area"
        },
        {
            "type": "City",
            "value": "Goderich"
        },
        {
            "type": "City",
            "value": "Gore Bay"
        },
        {
            "type": "City",
            "value": "Gravenhurst"
        },
        {
            "type": "City",
            "value": "Greater Madawaska"
        },
        {
            "type": "City",
            "value": "Greater Napanee"
        },
        {
            "type": "City",
            "value": "Greater Sudbury"
        },
        {
            "type": "City",
            "value": "Greely - Metcalfe - Osgoode - Vernon and Area"
        },
        {
            "type": "City",
            "value": "Greenstone"
        },
        {
            "type": "City",
            "value": "Grey Highlands"
        },
        {
            "type": "City",
            "value": "Grimsby"
        },
        {
            "type": "City",
            "value": "Guelph"
        },
        {
            "type": "City",
            "value": "Guelph/Eramosa"
        },
        {
            "type": "City",
            "value": "Haldimand"
        },
        {
            "type": "City",
            "value": "Halton Hills"
        },
        {
            "type": "City",
            "value": "Hamilton"
        },
        {
            "type": "City",
            "value": "Hamilton Township"
        },
        {
            "type": "City",
            "value": "Hanover"
        },
        {
            "type": "City",
            "value": "Harley"
        },
        {
            "type": "City",
            "value": "Hastings Highlands"
        },
        {
            "type": "City",
            "value": "Havelock-Belmont-Methuen"
        },
        {
            "type": "City",
            "value": "Hawkesbury"
        },
        {
            "type": "City",
            "value": "Head, Clara and Maria"
        },
        {
            "type": "City",
            "value": "Hiawatha First Nation"
        },
        {
            "type": "City",
            "value": "Highlands East"
        },
        {
            "type": "City",
            "value": "Hilton Beach"
        },
        {
            "type": "City",
            "value": "Hornepayne"
        },
        {
            "type": "City",
            "value": "Horton"
        },
        {
            "type": "City",
            "value": "Howick"
        },
        {
            "type": "City",
            "value": "Hunt Club - South Keys and Area"
        },
        {
            "type": "City",
            "value": "Hunt Club - Windsor Park Village and Area"
        },
        {
            "type": "City",
            "value": "Huntsville"
        },
        {
            "type": "City",
            "value": "Huron East"
        },
        {
            "type": "City",
            "value": "Huron Shores"
        },
        {
            "type": "City",
            "value": "Huron-Kinloss"
        },
        {
            "type": "City",
            "value": "Ignace"
        },
        {
            "type": "City",
            "value": "Ingersoll"
        },
        {
            "type": "City",
            "value": "Innisfil"
        },
        {
            "type": "City",
            "value": "Iroquois Falls"
        },
        {
            "type": "City",
            "value": "Jamaica"
        },
        {
            "type": "City",
            "value": "Joly"
        },
        {
            "type": "City",
            "value": "Kanata"
        },
        {
            "type": "City",
            "value": "Kawartha Lakes"
        },
        {
            "type": "City",
            "value": "Kearney"
        },
        {
            "type": "City",
            "value": "Kelowna"
        },
        {
            "type": "City",
            "value": "Killaloe, Hagarty & Richards"
        },
        {
            "type": "City",
            "value": "Killaloe, Hagarty and Richards"
        },
        {
            "type": "City",
            "value": "Kincardine"
        },
        {
            "type": "City",
            "value": "King"
        },
        {
            "type": "City",
            "value": "Kingston"
        },
        {
            "type": "City",
            "value": "Kingsville"
        },
        {
            "type": "City",
            "value": "Kirkland Lake"
        },
        {
            "type": "City",
            "value": "Kissimee Florida"
        },
        {
            "type": "City",
            "value": "Kitchener"
        },
        {
            "type": "City",
            "value": "Laird"
        },
        {
            "type": "City",
            "value": "Lake of Bays"
        },
        {
            "type": "City",
            "value": "Lakeshore"
        },
        {
            "type": "City",
            "value": "Lambton Shores"
        },
        {
            "type": "City",
            "value": "Lanark Highlands"
        },
        {
            "type": "City",
            "value": "Larder Lake"
        },
        {
            "type": "City",
            "value": "LaSalle"
        },
        {
            "type": "City",
            "value": "Laurentian Hills"
        },
        {
            "type": "City",
            "value": "Laurentian Valley"
        },
        {
            "type": "City",
            "value": "Leamington"
        },
        {
            "type": "City",
            "value": "Leeds & the Thousand Islands"
        },
        {
            "type": "City",
            "value": "Leeds and the Thousand Islands"
        },
        {
            "type": "City",
            "value": "Leitrim"
        },
        {
            "type": "City",
            "value": "Limerick"
        },
        {
            "type": "City",
            "value": "Lincoln"
        },
        {
            "type": "City",
            "value": "London"
        },
        {
            "type": "City",
            "value": "Lower Town - Sandy Hill"
        },
        {
            "type": "City",
            "value": "Loyalist"
        },
        {
            "type": "City",
            "value": "Lucan Biddulph"
        },
        {
            "type": "City",
            "value": "Machar"
        },
        {
            "type": "City",
            "value": "Madawaska Valley"
        },
        {
            "type": "City",
            "value": "Madoc"
        },
        {
            "type": "City",
            "value": "Magnetawan"
        },
        {
            "type": "City",
            "value": "Malahide"
        },
        {
            "type": "City",
            "value": "Manitouwadge"
        },
        {
            "type": "City",
            "value": "Manor Park - Cardinal Glen and Area"
        },
        {
            "type": "City",
            "value": "Manotick - Kars - Rideau Twp and Area"
        },
        {
            "type": "City",
            "value": "Mapleton"
        },
        {
            "type": "City",
            "value": "Markham"
        },
        {
            "type": "City",
            "value": "Markstay-Warren"
        },
        {
            "type": "City",
            "value": "Marmora and Lake"
        },
        {
            "type": "City",
            "value": "McDougall"
        },
        {
            "type": "City",
            "value": "McKellar"
        },
        {
            "type": "City",
            "value": "McKellar Heights - Glabar Park and Area"
        },
        {
            "type": "City",
            "value": "McMurrich/Monteith"
        },
        {
            "type": "City",
            "value": "McNab/Braeside"
        },
        {
            "type": "City",
            "value": "Meadowlands - Crestview and Area"
        },
        {
            "type": "City",
            "value": "Meaford"
        },
        {
            "type": "City",
            "value": "Melancthon"
        },
        {
            "type": "City",
            "value": "Merrickville-Wolford"
        },
        {
            "type": "City",
            "value": "Mexico"
        },
        {
            "type": "City",
            "value": "Miami Beach"
        },
        {
            "type": "City",
            "value": "Middlesex Centre"
        },
        {
            "type": "City",
            "value": "Midland"
        },
        {
            "type": "City",
            "value": "Milton"
        },
        {
            "type": "City",
            "value": "Minden Hills"
        },
        {
            "type": "City",
            "value": "Minto"
        },
        {
            "type": "City",
            "value": "Mississauga"
        },
        {
            "type": "City",
            "value": "Mississippi Mills"
        },
        {
            "type": "City",
            "value": "Mono"
        },
        {
            "type": "City",
            "value": "Montague"
        },
        {
            "type": "City",
            "value": "Montreal"
        },
        {
            "type": "City",
            "value": "Mooneys Bay - Carleton Heights and Area"
        },
        {
            "type": "City",
            "value": "Morris-Turnberry"
        },
        {
            "type": "City",
            "value": "Mulmur"
        },
        {
            "type": "City",
            "value": "Muskoka Lakes"
        },
        {
            "type": "City",
            "value": "New Brunswick"
        },
        {
            "type": "City",
            "value": "New Edinburgh - Lindenlea"
        },
        {
            "type": "City",
            "value": "New Tecumseth"
        },
        {
            "type": "City",
            "value": "Newbury"
        },
        {
            "type": "City",
            "value": "Newmarket"
        },
        {
            "type": "City",
            "value": "Niagara Falls"
        },
        {
            "type": "City",
            "value": "Niagara-on-the-Lake"
        },
        {
            "type": "City",
            "value": "Nipissing"
        },
        {
            "type": "City",
            "value": "Nipissing 10"
        },
        {
            "type": "City",
            "value": "Norfolk"
        },
        {
            "type": "City",
            "value": "North Algona Wilberforce"
        },
        {
            "type": "City",
            "value": "North Bay"
        },
        {
            "type": "City",
            "value": "North Dumfries"
        },
        {
            "type": "City",
            "value": "North Dundas"
        },
        {
            "type": "City",
            "value": "North Frontenac"
        },
        {
            "type": "City",
            "value": "North Glengarry"
        },
        {
            "type": "City",
            "value": "North Grenville"
        },
        {
            "type": "City",
            "value": "North Huron"
        },
        {
            "type": "City",
            "value": "North Kawartha"
        },
        {
            "type": "City",
            "value": "North Middlesex"
        },
        {
            "type": "City",
            "value": "North Perth"
        },
        {
            "type": "City",
            "value": "North Stormont"
        },
        {
            "type": "City",
            "value": "Northeastern Manitoulin and The Islands"
        },
        {
            "type": "City",
            "value": "Northern Bruce Peninsula"
        },
        {
            "type": "City",
            "value": "Norwich"
        },
        {
            "type": "City",
            "value": "Oakville"
        },
        {
            "type": "City",
            "value": "Oliver Paipoonge"
        },
        {
            "type": "City",
            "value": "Opasatika"
        },
        {
            "type": "City",
            "value": "Orangeville"
        },
        {
            "type": "City",
            "value": "Orillia"
        },
        {
            "type": "City",
            "value": "Orleans - Convent Glen and Area"
        },
        {
            "type": "City",
            "value": "Orleans - Cumberland and Area"
        },
        {
            "type": "City",
            "value": "Oro-Medonte"
        },
        {
            "type": "City",
            "value": "Oshawa"
        },
        {
            "type": "City",
            "value": "Otonabee-South Monaghan"
        },
        {
            "type": "City",
            "value": "Ottawa"
        },
        {
            "type": "City",
            "value": "Ottawa Centre"
        },
        {
            "type": "City",
            "value": "Out of Area"
        },
        {
            "type": "City",
            "value": "Overbook - Castleheights and Area"
        },
        {
            "type": "City",
            "value": "Owen Sound"
        },
        {
            "type": "City",
            "value": "Papineau-Cameron"
        },
        {
            "type": "City",
            "value": "Parkway Park - Queensway Terrace S and Area"
        },
        {
            "type": "City",
            "value": "Parry Sound"
        },
        {
            "type": "City",
            "value": "Parry Sound Remote Area"
        },
        {
            "type": "City",
            "value": "Pelee"
        },
        {
            "type": "City",
            "value": "Pelham"
        },
        {
            "type": "City",
            "value": "Pembroke"
        },
        {
            "type": "City",
            "value": "Penetanguishene"
        },
        {
            "type": "City",
            "value": "Perry"
        },
        {
            "type": "City",
            "value": "Perth"
        },
        {
            "type": "City",
            "value": "Perth East"
        },
        {
            "type": "City",
            "value": "Petawawa"
        },
        {
            "type": "City",
            "value": "Peterborough"
        },
        {
            "type": "City",
            "value": "Petrolia"
        },
        {
            "type": "City",
            "value": "Pickering"
        },
        {
            "type": "City",
            "value": "Plympton-Wyoming"
        },
        {
            "type": "City",
            "value": "Port Colborne"
        },
        {
            "type": "City",
            "value": "Port Hope"
        },
        {
            "type": "City",
            "value": "Powassan"
        },
        {
            "type": "City",
            "value": "Prescott"
        },
        {
            "type": "City",
            "value": "Prince Edward County"
        },
        {
            "type": "City",
            "value": "Puslinch"
        },
        {
            "type": "City",
            "value": "Qualicum - Bruce Farm - Greenbelt and Area"
        },
        {
            "type": "City",
            "value": "Quinte West"
        },
        {
            "type": "City",
            "value": "Rama First Nation 32"
        },
        {
            "type": "City",
            "value": "Ramara"
        },
        {
            "type": "City",
            "value": "Renfrew"
        },
        {
            "type": "City",
            "value": "Richmond Hill"
        },
        {
            "type": "City",
            "value": "Rideau Lakes"
        },
        {
            "type": "City",
            "value": "Rockcliffe Park"
        },
        {
            "type": "City",
            "value": "Roma/Italy"
        },
        {
            "type": "City",
            "value": "Russell"
        },
        {
            "type": "City",
            "value": "Ryerson"
        },
        {
            "type": "City",
            "value": "Sarnia"
        },
        {
            "type": "City",
            "value": "Saugeen Shores"
        },
        {
            "type": "City",
            "value": "Sault Ste Marie"
        },
        {
            "type": "City",
            "value": "Schreiber"
        },
        {
            "type": "City",
            "value": "Scugog"
        },
        {
            "type": "City",
            "value": "Seguin"
        },
        {
            "type": "City",
            "value": "Severn"
        },
        {
            "type": "City",
            "value": "Sheenboro"
        },
        {
            "type": "City",
            "value": "Shelburne"
        },
        {
            "type": "City",
            "value": "Sioux Lookout"
        },
        {
            "type": "City",
            "value": "Smith-Ennismore-Lakefield"
        },
        {
            "type": "City",
            "value": "Smiths Falls"
        },
        {
            "type": "City",
            "value": "Smooth Rock Falls"
        },
        {
            "type": "City",
            "value": "South Algonquin"
        },
        {
            "type": "City",
            "value": "South Bruce"
        },
        {
            "type": "City",
            "value": "South Bruce Peninsula"
        },
        {
            "type": "City",
            "value": "South Dundas"
        },
        {
            "type": "City",
            "value": "South Frontenac"
        },
        {
            "type": "City",
            "value": "South Glengarry"
        },
        {
            "type": "City",
            "value": "South Huron"
        },
        {
            "type": "City",
            "value": "South of Baseline to Knoxdale"
        },
        {
            "type": "City",
            "value": "South River"
        },
        {
            "type": "City",
            "value": "South Stormont"
        },
        {
            "type": "City",
            "value": "South-West Oxford"
        },
        {
            "type": "City",
            "value": "Southgate"
        },
        {
            "type": "City",
            "value": "Southwest Middlesex"
        },
        {
            "type": "City",
            "value": "Southwold"
        },
        {
            "type": "City",
            "value": "Spanish"
        },
        {
            "type": "City",
            "value": "Springwater"
        },
        {
            "type": "City",
            "value": "St. Catharines"
        },
        {
            "type": "City",
            "value": "St. Charles"
        },
        {
            "type": "City",
            "value": "St. Clair"
        },
        {
            "type": "City",
            "value": "St. Marys"
        },
        {
            "type": "City",
            "value": "St. Thomas"
        },
        {
            "type": "City",
            "value": "Stirling-Rawdon"
        },
        {
            "type": "City",
            "value": "Stittsville - Munster - Richmond"
        },
        {
            "type": "City",
            "value": "Stone Mills"
        },
        {
            "type": "City",
            "value": "Stratford"
        },
        {
            "type": "City",
            "value": "Strathroy-Caradoc"
        },
        {
            "type": "City",
            "value": "Strong"
        },
        {
            "type": "City",
            "value": "Sudbury Remote Area"
        },
        {
            "type": "City",
            "value": "Sundridge"
        },
        {
            "type": "City",
            "value": "Sunny Isle"
        },
        {
            "type": "City",
            "value": "Tanglewood - Grenfell Glen - Pineglen"
        },
        {
            "type": "City",
            "value": "Tay"
        },
        {
            "type": "City",
            "value": "Tay Valley"
        },
        {
            "type": "City",
            "value": "Tecumseh"
        },
        {
            "type": "City",
            "value": "Temagami"
        },
        {
            "type": "City",
            "value": "Temiskaming Shores"
        },
        {
            "type": "City",
            "value": "Terrace Bay"
        },
        {
            "type": "City",
            "value": "Thames Centre"
        },
        {
            "type": "City",
            "value": "The Archipelago"
        },
        {
            "type": "City",
            "value": "The Nation"
        },
        {
            "type": "City",
            "value": "Thessalon"
        },
        {
            "type": "City",
            "value": "Thorold"
        },
        {
            "type": "City",
            "value": "Thunder Bay"
        },
        {
            "type": "City",
            "value": "Thunder Bay Remote Area"
        },
        {
            "type": "City",
            "value": "Tillsonburg"
        },
        {
            "type": "City",
            "value": "Timiskaming Remote Area"
        },
        {
            "type": "City",
            "value": "Timmins"
        },
        {
            "type": "City",
            "value": "Tiny"
        },
        {
            "type": "City",
            "value": "Toronto C01"
        },
        {
            "type": "City",
            "value": "Toronto C02"
        },
        {
            "type": "City",
            "value": "Toronto C03"
        },
        {
            "type": "City",
            "value": "Toronto C04"
        },
        {
            "type": "City",
            "value": "Toronto C06"
        },
        {
            "type": "City",
            "value": "Toronto C07"
        },
        {
            "type": "City",
            "value": "Toronto C08"
        },
        {
            "type": "City",
            "value": "Toronto C09"
        },
        {
            "type": "City",
            "value": "Toronto C10"
        },
        {
            "type": "City",
            "value": "Toronto C11"
        },
        {
            "type": "City",
            "value": "Toronto C12"
        },
        {
            "type": "City",
            "value": "Toronto C13"
        },
        {
            "type": "City",
            "value": "Toronto C14"
        },
        {
            "type": "City",
            "value": "Toronto C15"
        },
        {
            "type": "City",
            "value": "Toronto E01"
        },
        {
            "type": "City",
            "value": "Toronto E02"
        },
        {
            "type": "City",
            "value": "Toronto E03"
        },
        {
            "type": "City",
            "value": "Toronto E04"
        },
        {
            "type": "City",
            "value": "Toronto E05"
        },
        {
            "type": "City",
            "value": "Toronto E06"
        },
        {
            "type": "City",
            "value": "Toronto E07"
        },
        {
            "type": "City",
            "value": "Toronto E08"
        },
        {
            "type": "City",
            "value": "Toronto E09"
        },
        {
            "type": "City",
            "value": "Toronto E10"
        },
        {
            "type": "City",
            "value": "Toronto E11"
        },
        {
            "type": "City",
            "value": "Toronto W01"
        },
        {
            "type": "City",
            "value": "Toronto W02"
        },
        {
            "type": "City",
            "value": "Toronto W03"
        },
        {
            "type": "City",
            "value": "Toronto W04"
        },
        {
            "type": "City",
            "value": "Toronto W05"
        },
        {
            "type": "City",
            "value": "Toronto W06"
        },
        {
            "type": "City",
            "value": "Toronto W07"
        },
        {
            "type": "City",
            "value": "Toronto W08"
        },
        {
            "type": "City",
            "value": "Toronto W09"
        },
        {
            "type": "City",
            "value": "Toronto W10"
        },
        {
            "type": "City",
            "value": "Trent Hills"
        },
        {
            "type": "City",
            "value": "Trinidad"
        },
        {
            "type": "City",
            "value": "Tudor & Cashel"
        },
        {
            "type": "City",
            "value": "Tudor and Cashel"
        },
        {
            "type": "City",
            "value": "Tunneys Pasture and Ottawa West"
        },
        {
            "type": "City",
            "value": "Tweed"
        },
        {
            "type": "City",
            "value": "Tyendinaga"
        },
        {
            "type": "City",
            "value": "Tyendinaga Mohawk Territory"
        },
        {
            "type": "City",
            "value": "Uxbridge"
        },
        {
            "type": "City",
            "value": "Val Rita-Harty"
        },
        {
            "type": "City",
            "value": "Vanier and Kingsview Park"
        },
        {
            "type": "City",
            "value": "Vaughan"
        },
        {
            "type": "City",
            "value": "Wainfleet"
        },
        {
            "type": "City",
            "value": "Warwick"
        },
        {
            "type": "City",
            "value": "Wasaga Beach"
        },
        {
            "type": "City",
            "value": "Waterloo"
        },
        {
            "type": "City",
            "value": "Wawa"
        },
        {
            "type": "City",
            "value": "Welland"
        },
        {
            "type": "City",
            "value": "Wellesley"
        },
        {
            "type": "City",
            "value": "Wellington North"
        },
        {
            "type": "City",
            "value": "West Centre Town"
        },
        {
            "type": "City",
            "value": "West Elgin"
        },
        {
            "type": "City",
            "value": "West Grey"
        },
        {
            "type": "City",
            "value": "West Lincoln"
        },
        {
            "type": "City",
            "value": "West Nipissing"
        },
        {
            "type": "City",
            "value": "West Perth"
        },
        {
            "type": "City",
            "value": "Westboro - Hampton Park"
        },
        {
            "type": "City",
            "value": "Westport"
        },
        {
            "type": "City",
            "value": "Whitby"
        },
        {
            "type": "City",
            "value": "Whitchurch-Stouffville"
        },
        {
            "type": "City",
            "value": "White River"
        },
        {
            "type": "City",
            "value": "Whitestone"
        },
        {
            "type": "City",
            "value": "Whitewater Region"
        },
        {
            "type": "City",
            "value": "Wilmot"
        },
        {
            "type": "City",
            "value": "Windsor"
        },
        {
            "type": "City",
            "value": "Wollaston"
        },
        {
            "type": "City",
            "value": "Woodroffe"
        },
        {
            "type": "City",
            "value": "Woodstock"
        },
        {
            "type": "City",
            "value": "Woolwich"
        },
        {
            "type": "City",
            "value": "Zorra"
        }
    ];

    // Filter locations and preserve type information
    const filteredLocations = locations
        .filter(location => location.value) // Remove null values
        .filter(location =>
            location.value.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleSearchClick = () => {
        if (onClicked) {
            onClicked(selectedLocation.value);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
        setSelectedIndex(-1);
    };

    const handleSelect = (location) => {
        setSearchTerm(location.value);
        setSelectedLocation(location);
        setIsOpen(false);
        if (onSelect) {
            onSelect(location);
        }
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredLocations.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSelect(filteredLocations[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const getLocationTypeLabel = (type) => {
        const typeLabels = {
            "CityRegion": "(Region)",
            "City": "(City)",
            "CountyOrParish": "(County)"
        };
        return typeLabels[type] || "";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Generate composite key
    const getCompositeKey = (location) => `${location.type}-${location.value}`;

    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Start typing a neighbourhood ..."
                    className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                />
                <button
                    onClick={handleSearchClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 button-homer-search transition-colors">
                    <CrossIcon className="w-5 h-5 text-white" />
                  
                </button>
            </div>

            {/* Dropdown with composite keys */}
            {isOpen && filteredLocations.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
                >
                    <ul className="py-2">
                        {filteredLocations.map((location, index) => (
                            <li
                                key={getCompositeKey(location)}
                                className={`px-4 py-2 cursor-pointer transition-colors ${selectedIndex === index
                                    ? 'bg-blue-50 text-blue-900'
                                    : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                onClick={() => handleSelect(location)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{location.value}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                        {getLocationTypeLabel(location.type)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CityRegionSearch;