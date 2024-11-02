import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const CitySearch = ({ onSelect, onClicked }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Sample data - replace with your actual data source
    const locations = [
        {
            "type": "CityRegion",
            "value": null
        },
        {
            "type": "CityRegion",
            "value": "055 - Grimsby Escarpment"
        },
        {
            "type": "CityRegion",
            "value": "056 - West Lincoln"
        },
        {
            "type": "CityRegion",
            "value": "057 - Smithville"
        },
        {
            "type": "CityRegion",
            "value": "101 - Town"
        },
        {
            "type": "CityRegion",
            "value": "1019 - WM Westmount"
        },
        {
            "type": "CityRegion",
            "value": "102 - Lakeshore"
        },
        {
            "type": "CityRegion",
            "value": "103 - River"
        },
        {
            "type": "CityRegion",
            "value": "104 - Rural"
        },
        {
            "type": "CityRegion",
            "value": "105 - St. Davids"
        },
        {
            "type": "CityRegion",
            "value": "106 - Queenston"
        },
        {
            "type": "CityRegion",
            "value": "107 - Glendale"
        },
        {
            "type": "CityRegion",
            "value": "108 - Virgil"
        },
        {
            "type": "CityRegion",
            "value": "1101 - Chatelaine Village"
        },
        {
            "type": "CityRegion",
            "value": "1102 - Bilberry Creek/Queenswood Heights"
        },
        {
            "type": "CityRegion",
            "value": "1103 - Fallingbrook/Ridgemount"
        },
        {
            "type": "CityRegion",
            "value": "1104 - Queenswood Heights South"
        },
        {
            "type": "CityRegion",
            "value": "1105 - Fallingbrook/Pineridge"
        },
        {
            "type": "CityRegion",
            "value": "1106 - Fallingbrook/Gardenway South"
        },
        {
            "type": "CityRegion",
            "value": "1107 - Springridge/East Village"
        },
        {
            "type": "CityRegion",
            "value": "1108 - Sarsfield/Bearbrook"
        },
        {
            "type": "CityRegion",
            "value": "1109 - Vars & Area"
        },
        {
            "type": "CityRegion",
            "value": "1110 - Camelot"
        },
        {
            "type": "CityRegion",
            "value": "1111 - Navan"
        },
        {
            "type": "CityRegion",
            "value": "1112 - Vars Village"
        },
        {
            "type": "CityRegion",
            "value": "1113 - Cumberland Village"
        },
        {
            "type": "CityRegion",
            "value": "1114 - Cumberland Estates"
        },
        {
            "type": "CityRegion",
            "value": "1115 - Cumberland Ridge"
        },
        {
            "type": "CityRegion",
            "value": "1116 - Cumberland West"
        },
        {
            "type": "CityRegion",
            "value": "1117 - Avalon West"
        },
        {
            "type": "CityRegion",
            "value": "1118 - Avalon East"
        },
        {
            "type": "CityRegion",
            "value": "1119 - Notting Hill/Summerside"
        },
        {
            "type": "CityRegion",
            "value": "1601 - Greely"
        },
        {
            "type": "CityRegion",
            "value": "1602 - Metcalfe"
        },
        {
            "type": "CityRegion",
            "value": "1603 - Osgoode"
        },
        {
            "type": "CityRegion",
            "value": "1604 - Vernon"
        },
        {
            "type": "CityRegion",
            "value": "1605 - Osgoode Twp North of Reg Rd 6"
        },
        {
            "type": "CityRegion",
            "value": "1606 - Osgoode Twp South of Reg Rd 6"
        },
        {
            "type": "CityRegion",
            "value": "2001 - Convent Glen"
        },
        {
            "type": "CityRegion",
            "value": "2002 - Hiawatha Park/Convent Glen"
        },
        {
            "type": "CityRegion",
            "value": "2003 - Orleans Wood"
        },
        {
            "type": "CityRegion",
            "value": "2004 - Convent Glen North"
        },
        {
            "type": "CityRegion",
            "value": "2005 - Convent Glen North"
        },
        {
            "type": "CityRegion",
            "value": "2006 - Convent Glen South"
        },
        {
            "type": "CityRegion",
            "value": "2007 - Convent Glen South"
        },
        {
            "type": "CityRegion",
            "value": "2008 - Chapel Hill"
        },
        {
            "type": "CityRegion",
            "value": "2009 - Chapel Hill"
        },
        {
            "type": "CityRegion",
            "value": "2010 - Chateauneuf"
        },
        {
            "type": "CityRegion",
            "value": "2011 - Orleans/Sunridge"
        },
        {
            "type": "CityRegion",
            "value": "2012 - Chapel Hill South - Orleans Village"
        },
        {
            "type": "CityRegion",
            "value": "2013 - Mer Bleue/Bradley Estates/Anderson Park"
        },
        {
            "type": "CityRegion",
            "value": "205 - Church's Lane"
        },
        {
            "type": "CityRegion",
            "value": "206 - Stamford"
        },
        {
            "type": "CityRegion",
            "value": "207 - Casey"
        },
        {
            "type": "CityRegion",
            "value": "208 - Mt. Carmel"
        },
        {
            "type": "CityRegion",
            "value": "209 - Beaverdams"
        },
        {
            "type": "CityRegion",
            "value": "21 - St. Marys"
        },
        {
            "type": "CityRegion",
            "value": "210 - Downtown"
        },
        {
            "type": "CityRegion",
            "value": "2101 - Rothwell Heights"
        },
        {
            "type": "CityRegion",
            "value": "2102 - Beacon Hill North"
        },
        {
            "type": "CityRegion",
            "value": "2103 - Beacon Hill North"
        },
        {
            "type": "CityRegion",
            "value": "2104 - Canotek Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "2105 - Beaconwood"
        },
        {
            "type": "CityRegion",
            "value": "2106 - Cardinal Heights"
        },
        {
            "type": "CityRegion",
            "value": "2107 - Beacon Hill South"
        },
        {
            "type": "CityRegion",
            "value": "2108 - Beacon Hill South"
        },
        {
            "type": "CityRegion",
            "value": "211 - Cherrywood"
        },
        {
            "type": "CityRegion",
            "value": "212 - Morrison"
        },
        {
            "type": "CityRegion",
            "value": "213 - Ascot"
        },
        {
            "type": "CityRegion",
            "value": "215 - Hospital"
        },
        {
            "type": "CityRegion",
            "value": "216 - Dorchester"
        },
        {
            "type": "CityRegion",
            "value": "217 - Arad/Fallsview"
        },
        {
            "type": "CityRegion",
            "value": "218 - West Wood"
        },
        {
            "type": "CityRegion",
            "value": "219 - Forestview"
        },
        {
            "type": "CityRegion",
            "value": "22 - Stratford"
        },
        {
            "type": "CityRegion",
            "value": "220 - Oldfield"
        },
        {
            "type": "CityRegion",
            "value": "2201 - Cyrville"
        },
        {
            "type": "CityRegion",
            "value": "2202 - Carson Grove"
        },
        {
            "type": "CityRegion",
            "value": "2203 - Cyrville Rd./Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "2204 - Pineview"
        },
        {
            "type": "CityRegion",
            "value": "221 - Marineland"
        },
        {
            "type": "CityRegion",
            "value": "222 - Brown"
        },
        {
            "type": "CityRegion",
            "value": "223 - Chippawa"
        },
        {
            "type": "CityRegion",
            "value": "224 - Lyons Creek"
        },
        {
            "type": "CityRegion",
            "value": "2301 - Blackburn Hamlet"
        },
        {
            "type": "CityRegion",
            "value": "2302 - Blackburn Hamlet"
        },
        {
            "type": "CityRegion",
            "value": "2303 - Blackburn Hamlet (South)"
        },
        {
            "type": "CityRegion",
            "value": "2401 - Carlsbad Springs"
        },
        {
            "type": "CityRegion",
            "value": "2501 - Leitrim"
        },
        {
            "type": "CityRegion",
            "value": "2601 - Cedardale"
        },
        {
            "type": "CityRegion",
            "value": "2602 - Riverside South/Gloucester Glen"
        },
        {
            "type": "CityRegion",
            "value": "2603 - Riverside South"
        },
        {
            "type": "CityRegion",
            "value": "2604 - Emerald Woods/Sawmill Creek"
        },
        {
            "type": "CityRegion",
            "value": "2605 - Blossom Park/Kemp Park/Findlay Creek"
        },
        {
            "type": "CityRegion",
            "value": "2607 - Sawmill Creek/Timbermill"
        },
        {
            "type": "CityRegion",
            "value": "2608 - Upper Hunt Club"
        },
        {
            "type": "CityRegion",
            "value": "31 - Elma Twp"
        },
        {
            "type": "CityRegion",
            "value": "3101 - Manor Park"
        },
        {
            "type": "CityRegion",
            "value": "3102 - Manor Park"
        },
        {
            "type": "CityRegion",
            "value": "3103 - Viscount Alexander Park"
        },
        {
            "type": "CityRegion",
            "value": "3104 - CFB Rockcliffe and Area"
        },
        {
            "type": "CityRegion",
            "value": "32 - Listowel"
        },
        {
            "type": "CityRegion",
            "value": "3201 - Rockcliffe"
        },
        {
            "type": "CityRegion",
            "value": "3202 - Rockcliffe"
        },
        {
            "type": "CityRegion",
            "value": "327 - Black Creek"
        },
        {
            "type": "CityRegion",
            "value": "328 - Stevensville"
        },
        {
            "type": "CityRegion",
            "value": "330 - Bertie Ridge"
        },
        {
            "type": "CityRegion",
            "value": "3301 - New Edinburgh"
        },
        {
            "type": "CityRegion",
            "value": "3302 - Lindenlea"
        },
        {
            "type": "CityRegion",
            "value": "331 - Bowen"
        },
        {
            "type": "CityRegion",
            "value": "332 - Central"
        },
        {
            "type": "CityRegion",
            "value": "333 - Lakeshore"
        },
        {
            "type": "CityRegion",
            "value": "334 - Crescent Park"
        },
        {
            "type": "CityRegion",
            "value": "335 - Ridgeway"
        },
        {
            "type": "CityRegion",
            "value": "337 - Crystal Beach"
        },
        {
            "type": "CityRegion",
            "value": "3401 - Kingsview Park"
        },
        {
            "type": "CityRegion",
            "value": "3402 - Vanier"
        },
        {
            "type": "CityRegion",
            "value": "3403 - Vanier"
        },
        {
            "type": "CityRegion",
            "value": "3404 - Vanier"
        },
        {
            "type": "CityRegion",
            "value": "3501 - Overbrook"
        },
        {
            "type": "CityRegion",
            "value": "3502 - Overbrook/Castle Heights"
        },
        {
            "type": "CityRegion",
            "value": "3503 - Castle Heights"
        },
        {
            "type": "CityRegion",
            "value": "3504 - Castle Heights/Rideau High"
        },
        {
            "type": "CityRegion",
            "value": "3505 - Carson Meadows"
        },
        {
            "type": "CityRegion",
            "value": "3601 - Eastway Gardens/Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "3602 - Riverview Park"
        },
        {
            "type": "CityRegion",
            "value": "3603 - Faircrest Heights"
        },
        {
            "type": "CityRegion",
            "value": "3604 - Applewood Acres"
        },
        {
            "type": "CityRegion",
            "value": "3605 - Alta Vista"
        },
        {
            "type": "CityRegion",
            "value": "3606 - Alta Vista/Faircrest Heights"
        },
        {
            "type": "CityRegion",
            "value": "3608 - Playfair Park"
        },
        {
            "type": "CityRegion",
            "value": "3609 - Guildwood Estates - Urbandale Acres"
        },
        {
            "type": "CityRegion",
            "value": "3701 - Elmvale Acres"
        },
        {
            "type": "CityRegion",
            "value": "3702 - Elmvale Acres"
        },
        {
            "type": "CityRegion",
            "value": "3703 - Elmvale Acres/Urbandale"
        },
        {
            "type": "CityRegion",
            "value": "3704 - Hawthorne Meadows"
        },
        {
            "type": "CityRegion",
            "value": "3705 - Sheffield Glen/Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "3801 - Ridgemont"
        },
        {
            "type": "CityRegion",
            "value": "3802 - Heron Gate"
        },
        {
            "type": "CityRegion",
            "value": "3803 - Ellwood"
        },
        {
            "type": "CityRegion",
            "value": "3804 - Heron Gate/Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "3805 - South Keys"
        },
        {
            "type": "CityRegion",
            "value": "3806 - Hunt Club Park/Greenboro"
        },
        {
            "type": "CityRegion",
            "value": "3807 -  St. Laurent Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "3808 - Hunt Club Park"
        },
        {
            "type": "CityRegion",
            "value": "400 East"
        },
        {
            "type": "CityRegion",
            "value": "400 North"
        },
        {
            "type": "CityRegion",
            "value": "400 West"
        },
        {
            "type": "CityRegion",
            "value": "4001 - Lower Town/Byward Market"
        },
        {
            "type": "CityRegion",
            "value": "4002 - Lower Town"
        },
        {
            "type": "CityRegion",
            "value": "4003 - Sandy Hill"
        },
        {
            "type": "CityRegion",
            "value": "4004 - Sandy Hill"
        },
        {
            "type": "CityRegion",
            "value": "401 Business Park"
        },
        {
            "type": "CityRegion",
            "value": "4101 - Ottawa Centre"
        },
        {
            "type": "CityRegion",
            "value": "4102 - Ottawa Centre"
        },
        {
            "type": "CityRegion",
            "value": "4103 - Ottawa Centre"
        },
        {
            "type": "CityRegion",
            "value": "4104 - Ottawa Centre/Golden Triangle"
        },
        {
            "type": "CityRegion",
            "value": "4201 - Mechanicsville"
        },
        {
            "type": "CityRegion",
            "value": "4202 - Hintonburg"
        },
        {
            "type": "CityRegion",
            "value": "4203 - Hintonburg"
        },
        {
            "type": "CityRegion",
            "value": "4204 - West Centre Town"
        },
        {
            "type": "CityRegion",
            "value": "4205 - West Centre Town"
        },
        {
            "type": "CityRegion",
            "value": "4301 - Ottawa West/Tunneys Pasture"
        },
        {
            "type": "CityRegion",
            "value": "4302 - Ottawa West"
        },
        {
            "type": "CityRegion",
            "value": "4303 - Ottawa West"
        },
        {
            "type": "CityRegion",
            "value": "436 - Port Weller"
        },
        {
            "type": "CityRegion",
            "value": "437 - Lakeshore"
        },
        {
            "type": "CityRegion",
            "value": "438 - Port Dalhousie"
        },
        {
            "type": "CityRegion",
            "value": "44 - Milverton"
        },
        {
            "type": "CityRegion",
            "value": "4401 - Glebe"
        },
        {
            "type": "CityRegion",
            "value": "4402 - Glebe"
        },
        {
            "type": "CityRegion",
            "value": "4403 - Old Ottawa South"
        },
        {
            "type": "CityRegion",
            "value": "4404 - Old Ottawa South/Rideau Gardens"
        },
        {
            "type": "CityRegion",
            "value": "4405 - Ottawa East"
        },
        {
            "type": "CityRegion",
            "value": "4406 - Ottawa East"
        },
        {
            "type": "CityRegion",
            "value": "4407 - Ottawa East"
        },
        {
            "type": "CityRegion",
            "value": "4408 - Ottawa East"
        },
        {
            "type": "CityRegion",
            "value": "441 - Bunting/Linwell"
        },
        {
            "type": "CityRegion",
            "value": "443 - Lakeport"
        },
        {
            "type": "CityRegion",
            "value": "444 - Carlton/Bunting"
        },
        {
            "type": "CityRegion",
            "value": "445 - Facer"
        },
        {
            "type": "CityRegion",
            "value": "446 - Fairview"
        },
        {
            "type": "CityRegion",
            "value": "450 - E. Chester"
        },
        {
            "type": "CityRegion",
            "value": "4501 - Dows Lake"
        },
        {
            "type": "CityRegion",
            "value": "4502 - West Centre Town"
        },
        {
            "type": "CityRegion",
            "value": "4503 - West Centre Town"
        },
        {
            "type": "CityRegion",
            "value": "4504 - Civic Hospital"
        },
        {
            "type": "CityRegion",
            "value": "4505 - Experimental Farm"
        },
        {
            "type": "CityRegion",
            "value": "451 - Downtown"
        },
        {
            "type": "CityRegion",
            "value": "452 - Haig"
        },
        {
            "type": "CityRegion",
            "value": "453 - Grapeview"
        },
        {
            "type": "CityRegion",
            "value": "454 - Rural Fourth"
        },
        {
            "type": "CityRegion",
            "value": "455 - Secord Woods"
        },
        {
            "type": "CityRegion",
            "value": "456 - Oakdale"
        },
        {
            "type": "CityRegion",
            "value": "457 - Old Glenridge"
        },
        {
            "type": "CityRegion",
            "value": "458 - Western Hill"
        },
        {
            "type": "CityRegion",
            "value": "459 - Ridley"
        },
        {
            "type": "CityRegion",
            "value": "460 - Burleigh Hill"
        },
        {
            "type": "CityRegion",
            "value": "4601 - Billings Bridge"
        },
        {
            "type": "CityRegion",
            "value": "4602 - Heron Park"
        },
        {
            "type": "CityRegion",
            "value": "4603 - Brookfield Gardens"
        },
        {
            "type": "CityRegion",
            "value": "4604 - Mooneys Bay/Riverside Park"
        },
        {
            "type": "CityRegion",
            "value": "4605 - Riverside Park"
        },
        {
            "type": "CityRegion",
            "value": "4606 - Riverside Park South"
        },
        {
            "type": "CityRegion",
            "value": "4607 - Riverside Park South"
        },
        {
            "type": "CityRegion",
            "value": "461 - Glendale/Glenridge"
        },
        {
            "type": "CityRegion",
            "value": "462 - Rykert/Vansickle"
        },
        {
            "type": "CityRegion",
            "value": "4702 - Carleton Square"
        },
        {
            "type": "CityRegion",
            "value": "4703 - Carleton Heights"
        },
        {
            "type": "CityRegion",
            "value": "4705 - Mooneys Bay"
        },
        {
            "type": "CityRegion",
            "value": "4801 - Quinterra"
        },
        {
            "type": "CityRegion",
            "value": "4802 - Hunt Club Woods"
        },
        {
            "type": "CityRegion",
            "value": "4803 - Hunt Club/Western Community"
        },
        {
            "type": "CityRegion",
            "value": "4804 - Hunt Club"
        },
        {
            "type": "CityRegion",
            "value": "4805 - Hunt Club"
        },
        {
            "type": "CityRegion",
            "value": "4806 - Hunt Club"
        },
        {
            "type": "CityRegion",
            "value": "4807 - Windsor Park Village"
        },
        {
            "type": "CityRegion",
            "value": "5001 - Westboro North"
        },
        {
            "type": "CityRegion",
            "value": "5002 - Westboro South"
        },
        {
            "type": "CityRegion",
            "value": "5003 - Westboro/Hampton Park"
        },
        {
            "type": "CityRegion",
            "value": "510 - Deep River"
        },
        {
            "type": "CityRegion",
            "value": "5101 - Woodroffe"
        },
        {
            "type": "CityRegion",
            "value": "5102 - Westboro West"
        },
        {
            "type": "CityRegion",
            "value": "5103 - Carlingwood"
        },
        {
            "type": "CityRegion",
            "value": "5104 - McKellar/Highland"
        },
        {
            "type": "CityRegion",
            "value": "5105 - Laurentianview"
        },
        {
            "type": "CityRegion",
            "value": "511 - Chalk River and Laurentian Hills South"
        },
        {
            "type": "CityRegion",
            "value": "512 - Head Twp"
        },
        {
            "type": "CityRegion",
            "value": "513 - Laurentian Hills North"
        },
        {
            "type": "CityRegion",
            "value": "520 - Petawawa"
        },
        {
            "type": "CityRegion",
            "value": "5201 - McKellar Heights/Glabar Park"
        },
        {
            "type": "CityRegion",
            "value": "5202 - McKellar Heights"
        },
        {
            "type": "CityRegion",
            "value": "530 - Pembroke"
        },
        {
            "type": "CityRegion",
            "value": "5301 - Carlington"
        },
        {
            "type": "CityRegion",
            "value": "5302 - Carlington"
        },
        {
            "type": "CityRegion",
            "value": "5303 - Carlington"
        },
        {
            "type": "CityRegion",
            "value": "5304 - Central Park"
        },
        {
            "type": "CityRegion",
            "value": "531 - Laurentian Valley"
        },
        {
            "type": "CityRegion",
            "value": "540 - Grimsby Beach"
        },
        {
            "type": "CityRegion",
            "value": "540 - Renfrew"
        },
        {
            "type": "CityRegion",
            "value": "5401 - Bel Air Park"
        },
        {
            "type": "CityRegion",
            "value": "5403 - Bel Air Heights"
        },
        {
            "type": "CityRegion",
            "value": "5404 - Woodward Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "5406 - Copeland Park"
        },
        {
            "type": "CityRegion",
            "value": "541 - Admaston/Bromley"
        },
        {
            "type": "CityRegion",
            "value": "541 - Grimsby West"
        },
        {
            "type": "CityRegion",
            "value": "542 - Greater Madawaska"
        },
        {
            "type": "CityRegion",
            "value": "542 - Grimsby East"
        },
        {
            "type": "CityRegion",
            "value": "544 - Horton Twp"
        },
        {
            "type": "CityRegion",
            "value": "550 - Arnprior"
        },
        {
            "type": "CityRegion",
            "value": "551 - Mcnab/Braeside Twps"
        },
        {
            "type": "CityRegion",
            "value": "557 - Thorold Downtown"
        },
        {
            "type": "CityRegion",
            "value": "558 - Confederation Heights"
        },
        {
            "type": "CityRegion",
            "value": "560 - Eganville/Bonnechere Twp"
        },
        {
            "type": "CityRegion",
            "value": "560 - Rolling Meadows"
        },
        {
            "type": "CityRegion",
            "value": "561 - North Algona/Wilberforce Twp"
        },
        {
            "type": "CityRegion",
            "value": "561 - Port Robinson"
        },
        {
            "type": "CityRegion",
            "value": "562 - Hurricane/Merrittville"
        },
        {
            "type": "CityRegion",
            "value": "570 - Madawaska Valley"
        },
        {
            "type": "CityRegion",
            "value": "571 - Killaloe/Round Lake"
        },
        {
            "type": "CityRegion",
            "value": "572 - Brudenell/Lyndoch/Raglan"
        },
        {
            "type": "CityRegion",
            "value": "580 - Whitewater Region"
        },
        {
            "type": "CityRegion",
            "value": "581 - Beachburg"
        },
        {
            "type": "CityRegion",
            "value": "582 - Cobden"
        },
        {
            "type": "CityRegion",
            "value": "6001 - Woodroffe"
        },
        {
            "type": "CityRegion",
            "value": "6002 - Woodroffe"
        },
        {
            "type": "CityRegion",
            "value": "601 - Village of Russell"
        },
        {
            "type": "CityRegion",
            "value": "602 - Embrun"
        },
        {
            "type": "CityRegion",
            "value": "603 - Russell Twp"
        },
        {
            "type": "CityRegion",
            "value": "604 - Casselman"
        },
        {
            "type": "CityRegion",
            "value": "605 - The Nation Municipality"
        },
        {
            "type": "CityRegion",
            "value": "606 - Town of Rockland"
        },
        {
            "type": "CityRegion",
            "value": "607 - Clarence/Rockland Twp"
        },
        {
            "type": "CityRegion",
            "value": "608 - Plantagenet"
        },
        {
            "type": "CityRegion",
            "value": "609 - Alfred"
        },
        {
            "type": "CityRegion",
            "value": "610 - Alfred and Plantagenet Twp"
        },
        {
            "type": "CityRegion",
            "value": "6101 - Britannia"
        },
        {
            "type": "CityRegion",
            "value": "6102 - Britannia"
        },
        {
            "type": "CityRegion",
            "value": "611 - L'Orignal"
        },
        {
            "type": "CityRegion",
            "value": "612 - Hawkesbury"
        },
        {
            "type": "CityRegion",
            "value": "613 - Vankleek Hill"
        },
        {
            "type": "CityRegion",
            "value": "614 - Champlain Twp"
        },
        {
            "type": "CityRegion",
            "value": "615 - East Hawkesbury Twp"
        },
        {
            "type": "CityRegion",
            "value": "616 - Limoges"
        },
        {
            "type": "CityRegion",
            "value": "6201 - Britannia Heights"
        },
        {
            "type": "CityRegion",
            "value": "6202 - Fairfield Heights"
        },
        {
            "type": "CityRegion",
            "value": "6203 - Queensway Terrace North"
        },
        {
            "type": "CityRegion",
            "value": "6204 - Whitehaven"
        },
        {
            "type": "CityRegion",
            "value": "6301 - Redwood Park"
        },
        {
            "type": "CityRegion",
            "value": "6302 - Parkway Park"
        },
        {
            "type": "CityRegion",
            "value": "6303 - Queensway Terrace South/Ridgeview"
        },
        {
            "type": "CityRegion",
            "value": "6304 - Parkway Park"
        },
        {
            "type": "CityRegion",
            "value": "6305 - Kenson Park"
        },
        {
            "type": "CityRegion",
            "value": "65 - Town of Mitchell"
        },
        {
            "type": "CityRegion",
            "value": "662 - Fonthill"
        },
        {
            "type": "CityRegion",
            "value": "663 - North Pelham"
        },
        {
            "type": "CityRegion",
            "value": "664 - Fenwick"
        },
        {
            "type": "CityRegion",
            "value": "7001 - Crystal Bay/Rocky Point"
        },
        {
            "type": "CityRegion",
            "value": "7002 - Crystal Beach"
        },
        {
            "type": "CityRegion",
            "value": "7003 - Lakeview Park"
        },
        {
            "type": "CityRegion",
            "value": "7004 - Bayshore"
        },
        {
            "type": "CityRegion",
            "value": "701 - Morrisburg"
        },
        {
            "type": "CityRegion",
            "value": "702 - Iroquois"
        },
        {
            "type": "CityRegion",
            "value": "703 - South Dundas (Matilda) Twp"
        },
        {
            "type": "CityRegion",
            "value": "704 - South Dundas (Williamsburgh) Twp"
        },
        {
            "type": "CityRegion",
            "value": "705 - Chesterville"
        },
        {
            "type": "CityRegion",
            "value": "706 - Winchester"
        },
        {
            "type": "CityRegion",
            "value": "707 - North Dundas (Winchester) Twp"
        },
        {
            "type": "CityRegion",
            "value": "708 - North Dundas (Mountain) Twp"
        },
        {
            "type": "CityRegion",
            "value": "709 - Finch"
        },
        {
            "type": "CityRegion",
            "value": "710 - Moose Creek"
        },
        {
            "type": "CityRegion",
            "value": "7102 - Bruce Farm/Graham Park/Qualicum/Bellands"
        },
        {
            "type": "CityRegion",
            "value": "711 - North Stormont (Finch) Twp"
        },
        {
            "type": "CityRegion",
            "value": "712 - North Stormont (Roxborough) Twp"
        },
        {
            "type": "CityRegion",
            "value": "713 - Ingleside"
        },
        {
            "type": "CityRegion",
            "value": "714 - Long Sault"
        },
        {
            "type": "CityRegion",
            "value": "715 - South Stormont (Osnabruck) Twp"
        },
        {
            "type": "CityRegion",
            "value": "716 - South Stormont (Cornwall) Twp"
        },
        {
            "type": "CityRegion",
            "value": "717 - Cornwall"
        },
        {
            "type": "CityRegion",
            "value": "718 - Maxville"
        },
        {
            "type": "CityRegion",
            "value": "719 - Alexandria"
        },
        {
            "type": "CityRegion",
            "value": "720 - North Glengarry (Kenyon) Twp"
        },
        {
            "type": "CityRegion",
            "value": "7201 - City View/Skyline/Fisher Heights/Parkwood Hills"
        },
        {
            "type": "CityRegion",
            "value": "7202 - Borden Farm/Stewart Farm/Carleton Heights/Parkwood Hills"
        },
        {
            "type": "CityRegion",
            "value": "7203 - Merivale Industrial Park/Citiplace"
        },
        {
            "type": "CityRegion",
            "value": "721 - North Glengarry (Lochiel) Twp"
        },
        {
            "type": "CityRegion",
            "value": "722 - Lancaster"
        },
        {
            "type": "CityRegion",
            "value": "723 - South Glengarry (Charlottenburgh) Twp"
        },
        {
            "type": "CityRegion",
            "value": "724 - South Glengarry (Lancaster) Twp"
        },
        {
            "type": "CityRegion",
            "value": "7301 - Meadowlands/St. Claire Gardens"
        },
        {
            "type": "CityRegion",
            "value": "7302 - Meadowlands/Crestview"
        },
        {
            "type": "CityRegion",
            "value": "7401 - Rideau Heights/Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "7402 - Pineglen/Country Place"
        },
        {
            "type": "CityRegion",
            "value": "7403 - Rideau Heights/Ashdale/Rideau Glen"
        },
        {
            "type": "CityRegion",
            "value": "7501 - Tanglewood"
        },
        {
            "type": "CityRegion",
            "value": "7502 - Merivale Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "7503 - Merivale Gardens"
        },
        {
            "type": "CityRegion",
            "value": "7505 - Pineglen"
        },
        {
            "type": "CityRegion",
            "value": "7601 - Leslie Park"
        },
        {
            "type": "CityRegion",
            "value": "7602 - Briargreen"
        },
        {
            "type": "CityRegion",
            "value": "7603 - Sheahan Estates/Trend Village"
        },
        {
            "type": "CityRegion",
            "value": "7604 - Craig Henry/Woodvale"
        },
        {
            "type": "CityRegion",
            "value": "7605 - Arlington Woods"
        },
        {
            "type": "CityRegion",
            "value": "7606 - Manordale"
        },
        {
            "type": "CityRegion",
            "value": "7607 - Centrepointe"
        },
        {
            "type": "CityRegion",
            "value": "766 - Hwy 406/Welland"
        },
        {
            "type": "CityRegion",
            "value": "767 - N. Welland"
        },
        {
            "type": "CityRegion",
            "value": "768 - Welland Downtown"
        },
        {
            "type": "CityRegion",
            "value": "769 - Prince Charles"
        },
        {
            "type": "CityRegion",
            "value": "770 - West Welland"
        },
        {
            "type": "CityRegion",
            "value": "7701 - Barrhaven - Pheasant Run"
        },
        {
            "type": "CityRegion",
            "value": "7702 - Barrhaven - Knollsbrook"
        },
        {
            "type": "CityRegion",
            "value": "7703 - Barrhaven - Cedargrove/Fraserdale"
        },
        {
            "type": "CityRegion",
            "value": "7704 - Barrhaven - Heritage Park"
        },
        {
            "type": "CityRegion",
            "value": "7705 - Barrhaven - On the Green"
        },
        {
            "type": "CityRegion",
            "value": "7706 - Barrhaven - Longfields"
        },
        {
            "type": "CityRegion",
            "value": "7707 - Barrhaven - Hearts Desire"
        },
        {
            "type": "CityRegion",
            "value": "7708 - Barrhaven - Stonebridge"
        },
        {
            "type": "CityRegion",
            "value": "7709 - Barrhaven - Strandherd"
        },
        {
            "type": "CityRegion",
            "value": "771 - Coyle Creek"
        },
        {
            "type": "CityRegion",
            "value": "7710 - Barrhaven East"
        },
        {
            "type": "CityRegion",
            "value": "7711 - Barrhaven - Half Moon Bay"
        },
        {
            "type": "CityRegion",
            "value": "772 - Broadway"
        },
        {
            "type": "CityRegion",
            "value": "773 - Lincoln/Crowland"
        },
        {
            "type": "CityRegion",
            "value": "774 - Dain City"
        },
        {
            "type": "CityRegion",
            "value": "7801 - Bellwood - Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "7802 - Westcliffe Estates"
        },
        {
            "type": "CityRegion",
            "value": "7803 - Bells Corners"
        },
        {
            "type": "CityRegion",
            "value": "7804 - Lynwood Village"
        },
        {
            "type": "CityRegion",
            "value": "7805 - Arbeatha Park"
        },
        {
            "type": "CityRegion",
            "value": "7807 - Fallowfield"
        },
        {
            "type": "CityRegion",
            "value": "7901 - South of Fallowfield Road"
        },
        {
            "type": "CityRegion",
            "value": "8001 - Manotick Long Island & Nicholls Island"
        },
        {
            "type": "CityRegion",
            "value": "8002 - Manotick Village & Manotick Estates"
        },
        {
            "type": "CityRegion",
            "value": "8003 - Mahogany Community"
        },
        {
            "type": "CityRegion",
            "value": "8004 - Manotick South to Roger Stevens"
        },
        {
            "type": "CityRegion",
            "value": "8005 - Manotick East to Manotick Station"
        },
        {
            "type": "CityRegion",
            "value": "8007 - Rideau Twp S of Reg Rd 6 E of Mccordick Rd."
        },
        {
            "type": "CityRegion",
            "value": "8008 - Rideau Twp S of Reg Rd 6 W of Mccordick Rd."
        },
        {
            "type": "CityRegion",
            "value": "8009 - North Gower"
        },
        {
            "type": "CityRegion",
            "value": "801 - Kemptville"
        },
        {
            "type": "CityRegion",
            "value": "8010 - Kars"
        },
        {
            "type": "CityRegion",
            "value": "802 - North Grenville Twp (Kemptville East)"
        },
        {
            "type": "CityRegion",
            "value": "803 - North Grenville Twp (Kemptville South)"
        },
        {
            "type": "CityRegion",
            "value": "804 - Merrickville"
        },
        {
            "type": "CityRegion",
            "value": "805 - Merrickville/Wolford Twp"
        },
        {
            "type": "CityRegion",
            "value": "806 - Town of Cardinal"
        },
        {
            "type": "CityRegion",
            "value": "807 - Edwardsburgh/Cardinal Twp"
        },
        {
            "type": "CityRegion",
            "value": "808 - Prescott"
        },
        {
            "type": "CityRegion",
            "value": "809 - Augusta Twp"
        },
        {
            "type": "CityRegion",
            "value": "810 - Brockville"
        },
        {
            "type": "CityRegion",
            "value": "811 - Elizabethtown Kitley (Old Kitley) Twp"
        },
        {
            "type": "CityRegion",
            "value": "812 - Athens"
        },
        {
            "type": "CityRegion",
            "value": "813 - R of Yonge & Escott Twp"
        },
        {
            "type": "CityRegion",
            "value": "814 - Elizabethtown Kitley (Old K.) Twp"
        },
        {
            "type": "CityRegion",
            "value": "815 - Westport"
        },
        {
            "type": "CityRegion",
            "value": "816 - Rideau Lakes (North Crosby) Twp"
        },
        {
            "type": "CityRegion",
            "value": "817 - Rideau Lakes (South Crosby) Twp"
        },
        {
            "type": "CityRegion",
            "value": "818 - Rideau Lakes (Bastard) Twp"
        },
        {
            "type": "CityRegion",
            "value": "819 - Rideau Lakes (South Burgess) Twp"
        },
        {
            "type": "CityRegion",
            "value": "820 - Rideau Lakes (South Elmsley) Twp"
        },
        {
            "type": "CityRegion",
            "value": "8201 - Fringewood"
        },
        {
            "type": "CityRegion",
            "value": "8202 - Stittsville (Central)"
        },
        {
            "type": "CityRegion",
            "value": "8203 - Stittsville (South)"
        },
        {
            "type": "CityRegion",
            "value": "8204 - Richmond"
        },
        {
            "type": "CityRegion",
            "value": "8205 - Munster"
        },
        {
            "type": "CityRegion",
            "value": "8207 - Remainder of Stittsville & Area"
        },
        {
            "type": "CityRegion",
            "value": "8208 - Btwn Franktown Rd. & Fallowfield Rd."
        },
        {
            "type": "CityRegion",
            "value": "8209 - Goulbourn Twp From Franktown Rd/South To Rideau"
        },
        {
            "type": "CityRegion",
            "value": "821 - Gananoque"
        },
        {
            "type": "CityRegion",
            "value": "8210 - Rideau Twp South To Roger Stevens Drive"
        },
        {
            "type": "CityRegion",
            "value": "8211 - Stittsville (North)"
        },
        {
            "type": "CityRegion",
            "value": "822 - Front of Yonge Twp"
        },
        {
            "type": "CityRegion",
            "value": "823 - Front of Escott Twp"
        },
        {
            "type": "CityRegion",
            "value": "824 - Rear of Leeds - Lansdowne Twp"
        },
        {
            "type": "CityRegion",
            "value": "825 - Front of Leeds - Lansdowne Twp"
        },
        {
            "type": "CityRegion",
            "value": "826 - Rideau Lakes (Newboro) Twp"
        },
        {
            "type": "CityRegion",
            "value": "873 - Bethel"
        },
        {
            "type": "CityRegion",
            "value": "874 - Sherkston"
        },
        {
            "type": "CityRegion",
            "value": "875 - Killaly East"
        },
        {
            "type": "CityRegion",
            "value": "876 - East Village"
        },
        {
            "type": "CityRegion",
            "value": "877 - Main Street"
        },
        {
            "type": "CityRegion",
            "value": "878 - Sugarloaf"
        },
        {
            "type": "CityRegion",
            "value": "880 - Lakeshore"
        },
        {
            "type": "CityRegion",
            "value": "9001 - Kanata - Beaverbrook"
        },
        {
            "type": "CityRegion",
            "value": "9002 - Kanata - Katimavik"
        },
        {
            "type": "CityRegion",
            "value": "9003 - Kanata - Glencairn/Hazeldean"
        },
        {
            "type": "CityRegion",
            "value": "9004 - Kanata - Bridlewood"
        },
        {
            "type": "CityRegion",
            "value": "9005 - Kanata - Kanata (North West)"
        },
        {
            "type": "CityRegion",
            "value": "9006 - Kanata - Kanata (North East)"
        },
        {
            "type": "CityRegion",
            "value": "9007 - Kanata - Kanata Lakes/Heritage Hills"
        },
        {
            "type": "CityRegion",
            "value": "9008 - Kanata - Morgan's Grant/South March"
        },
        {
            "type": "CityRegion",
            "value": "9009 - Kanata - Rural Kanata (Central)"
        },
        {
            "type": "CityRegion",
            "value": "901 - Smiths Falls"
        },
        {
            "type": "CityRegion",
            "value": "9010 - Kanata - Emerald Meadows/Trailwest"
        },
        {
            "type": "CityRegion",
            "value": "902 - Montague Twp"
        },
        {
            "type": "CityRegion",
            "value": "903 - Drummond/North Elmsley (North Elmsley) Twp"
        },
        {
            "type": "CityRegion",
            "value": "904 - Bathurst/Burgess & Sherbrooke (North Burgess) Twp"
        },
        {
            "type": "CityRegion",
            "value": "905 - Bathurst/Burgess & Sherbrooke (South Sherbrooke) Twp"
        },
        {
            "type": "CityRegion",
            "value": "906 - Bathurst/Burgess & Sherbrooke (Bathurst) Twp"
        },
        {
            "type": "CityRegion",
            "value": "907 - Perth"
        },
        {
            "type": "CityRegion",
            "value": "908 - Drummond N Elmsley (Drummond) Twp"
        },
        {
            "type": "CityRegion",
            "value": "909 - Carleton Place"
        },
        {
            "type": "CityRegion",
            "value": "910 - Beckwith Twp"
        },
        {
            "type": "CityRegion",
            "value": "9101 - Carp"
        },
        {
            "type": "CityRegion",
            "value": "9102 - Huntley Ward (North East)"
        },
        {
            "type": "CityRegion",
            "value": "9103 - Huntley Ward (North West)"
        },
        {
            "type": "CityRegion",
            "value": "9104 - Huntley Ward (South East)"
        },
        {
            "type": "CityRegion",
            "value": "9105 - Huntley Ward (South West)"
        },
        {
            "type": "CityRegion",
            "value": "911 - Almonte"
        },
        {
            "type": "CityRegion",
            "value": "912 - Mississippi Mills (Ramsay) Twp"
        },
        {
            "type": "CityRegion",
            "value": "913 - Lanark Highlands (Lanark) Twp"
        },
        {
            "type": "CityRegion",
            "value": "914 - Lanark Highlands (Dalhousie) Twp"
        },
        {
            "type": "CityRegion",
            "value": "916 - Lanark Highlands (Lavant) Twp"
        },
        {
            "type": "CityRegion",
            "value": "917 - Lanark Highlands (Darling) Twp"
        },
        {
            "type": "CityRegion",
            "value": "918 - Mississippi Mills - Pakenham"
        },
        {
            "type": "CityRegion",
            "value": "919 - Lanark Highlands (Lanark Village)"
        },
        {
            "type": "CityRegion",
            "value": "9301 - Constance Bay"
        },
        {
            "type": "CityRegion",
            "value": "9302 - Woodlawn/Maclarens Landing/Kilmaurs"
        },
        {
            "type": "CityRegion",
            "value": "9303 - Dunrobin"
        },
        {
            "type": "CityRegion",
            "value": "9304 - Dunrobin Shores"
        },
        {
            "type": "CityRegion",
            "value": "9401 - Fitzroy"
        },
        {
            "type": "CityRegion",
            "value": "9402 - Kinburn"
        },
        {
            "type": "CityRegion",
            "value": "9403 - Fitzroy Ward (South West)"
        },
        {
            "type": "CityRegion",
            "value": "980 - Lincoln-Jordan/Vineland"
        },
        {
            "type": "CityRegion",
            "value": "982 - Beamsville"
        },
        {
            "type": "CityRegion",
            "value": "983 - Escarpment"
        },
        {
            "type": "CityRegion",
            "value": "AY"
        },
        {
            "type": "CityRegion",
            "value": "Aberfoyle"
        },
        {
            "type": "CityRegion",
            "value": "Acton"
        },
        {
            "type": "CityRegion",
            "value": "Addington Highlands"
        },
        {
            "type": "CityRegion",
            "value": "Agincourt North"
        },
        {
            "type": "CityRegion",
            "value": "Agincourt South-Malvern West"
        },
        {
            "type": "CityRegion",
            "value": "Aileen-Willowbrook"
        },
        {
            "type": "CityRegion",
            "value": "Ailsa Craig"
        },
        {
            "type": "CityRegion",
            "value": "Ainslie Wood"
        },
        {
            "type": "CityRegion",
            "value": "Airport Corporate"
        },
        {
            "type": "CityRegion",
            "value": "Airport Employment Area"
        },
        {
            "type": "CityRegion",
            "value": "Airport Road/ Highway 7 Business Centre"
        },
        {
            "type": "CityRegion",
            "value": "Alcona"
        },
        {
            "type": "CityRegion",
            "value": "Alderwood"
        },
        {
            "type": "CityRegion",
            "value": "Allanburg/Thorold South"
        },
        {
            "type": "CityRegion",
            "value": "Allandale"
        },
        {
            "type": "CityRegion",
            "value": "Allandale Centre"
        },
        {
            "type": "CityRegion",
            "value": "Allandale Heights"
        },
        {
            "type": "CityRegion",
            "value": "Alliance"
        },
        {
            "type": "CityRegion",
            "value": "Allison"
        },
        {
            "type": "CityRegion",
            "value": "Alliston"
        },
        {
            "type": "CityRegion",
            "value": "Alton"
        },
        {
            "type": "CityRegion",
            "value": "Amberlea"
        },
        {
            "type": "CityRegion",
            "value": "Ameliasburgh"
        },
        {
            "type": "CityRegion",
            "value": "Amherstburg"
        },
        {
            "type": "CityRegion",
            "value": "Amherstview"
        },
        {
            "type": "CityRegion",
            "value": "Ancaster"
        },
        {
            "type": "CityRegion",
            "value": "Angus"
        },
        {
            "type": "CityRegion",
            "value": "Angus Glen"
        },
        {
            "type": "CityRegion",
            "value": "Annex"
        },
        {
            "type": "CityRegion",
            "value": "Anten Mills"
        },
        {
            "type": "CityRegion",
            "value": "Appin"
        },
        {
            "type": "CityRegion",
            "value": "Appleby"
        },
        {
            "type": "CityRegion",
            "value": "Applewood"
        },
        {
            "type": "CityRegion",
            "value": "Arad/Fallsview"
        },
        {
            "type": "CityRegion",
            "value": "Ardagh"
        },
        {
            "type": "CityRegion",
            "value": "Ardtrea"
        },
        {
            "type": "CityRegion",
            "value": "Arkona"
        },
        {
            "type": "CityRegion",
            "value": "Armitage"
        },
        {
            "type": "CityRegion",
            "value": "Arran-Elderslie"
        },
        {
            "type": "CityRegion",
            "value": "Arthur"
        },
        {
            "type": "CityRegion",
            "value": "Arva"
        },
        {
            "type": "CityRegion",
            "value": "Ascot"
        },
        {
            "type": "CityRegion",
            "value": "Ashburnham"
        },
        {
            "type": "CityRegion",
            "value": "Ashfield Twp"
        },
        {
            "type": "CityRegion",
            "value": "Atherley"
        },
        {
            "type": "CityRegion",
            "value": "Athol"
        },
        {
            "type": "CityRegion",
            "value": "Aurora Estates"
        },
        {
            "type": "CityRegion",
            "value": "Aurora Grove"
        },
        {
            "type": "CityRegion",
            "value": "Aurora Heights"
        },
        {
            "type": "CityRegion",
            "value": "Aurora Highlands"
        },
        {
            "type": "CityRegion",
            "value": "Aurora Village"
        },
        {
            "type": "CityRegion",
            "value": "Avondale"
        },
        {
            "type": "CityRegion",
            "value": "Ayton"
        },
        {
            "type": "CityRegion",
            "value": "Baldwin"
        },
        {
            "type": "CityRegion",
            "value": "Balfour"
        },
        {
            "type": "CityRegion",
            "value": "Ballantrae"
        },
        {
            "type": "CityRegion",
            "value": "Baltimore"
        },
        {
            "type": "CityRegion",
            "value": "Banbury-Don Mills"
        },
        {
            "type": "CityRegion",
            "value": "Barnstown"
        },
        {
            "type": "CityRegion",
            "value": "Bartonville"
        },
        {
            "type": "CityRegion",
            "value": "Bass Lake"
        },
        {
            "type": "CityRegion",
            "value": "Bath"
        },
        {
            "type": "CityRegion",
            "value": "Bathurst Manor"
        },
        {
            "type": "CityRegion",
            "value": "Baxter"
        },
        {
            "type": "CityRegion",
            "value": "Bay Ridges"
        },
        {
            "type": "CityRegion",
            "value": "Bay Street Corridor"
        },
        {
            "type": "CityRegion",
            "value": "Bayfield"
        },
        {
            "type": "CityRegion",
            "value": "Bayshore"
        },
        {
            "type": "CityRegion",
            "value": "Bayview"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Fairway-Bayview Country Club Estates"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Glen"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Hill"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Northeast"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Southeast"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Village"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Wellington"
        },
        {
            "type": "CityRegion",
            "value": "Bayview Woods-Steeles"
        },
        {
            "type": "CityRegion",
            "value": "Beachville"
        },
        {
            "type": "CityRegion",
            "value": "Beamsville"
        },
        {
            "type": "CityRegion",
            "value": "Beasley"
        },
        {
            "type": "CityRegion",
            "value": "Beaton"
        },
        {
            "type": "CityRegion",
            "value": "Beaty"
        },
        {
            "type": "CityRegion",
            "value": "Beausoleil First Nation"
        },
        {
            "type": "CityRegion",
            "value": "Beaver Creek Business Park"
        },
        {
            "type": "CityRegion",
            "value": "Beaverdams"
        },
        {
            "type": "CityRegion",
            "value": "Beaverton"
        },
        {
            "type": "CityRegion",
            "value": "Bedford Park-Nortown"
        },
        {
            "type": "CityRegion",
            "value": "Beechborough-Greenbrook"
        },
        {
            "type": "CityRegion",
            "value": "Beeton"
        },
        {
            "type": "CityRegion",
            "value": "Belhaven"
        },
        {
            "type": "CityRegion",
            "value": "Belmont"
        },
        {
            "type": "CityRegion",
            "value": "Belwood"
        },
        {
            "type": "CityRegion",
            "value": "Bendale"
        },
        {
            "type": "CityRegion",
            "value": "Berczy"
        },
        {
            "type": "CityRegion",
            "value": "Berrisfield"
        },
        {
            "type": "CityRegion",
            "value": "Bethany"
        },
        {
            "type": "CityRegion",
            "value": "Bethel"
        },
        {
            "type": "CityRegion",
            "value": "Beverley Glen"
        },
        {
            "type": "CityRegion",
            "value": "Bewdley"
        },
        {
            "type": "CityRegion",
            "value": "Bills Corners"
        },
        {
            "type": "CityRegion",
            "value": "Binbrook"
        },
        {
            "type": "CityRegion",
            "value": "Birchcliffe-Cliffside"
        },
        {
            "type": "CityRegion",
            "value": "Black Creek"
        },
        {
            "type": "CityRegion",
            "value": "Blackstock"
        },
        {
            "type": "CityRegion",
            "value": "Blake-Jones"
        },
        {
            "type": "CityRegion",
            "value": "Blakeley"
        },
        {
            "type": "CityRegion",
            "value": "Blenheim"
        },
        {
            "type": "CityRegion",
            "value": "Bloomfield"
        },
        {
            "type": "CityRegion",
            "value": "Blue Grass Meadows"
        },
        {
            "type": "CityRegion",
            "value": "Blue Mountain Resort Area"
        },
        {
            "type": "CityRegion",
            "value": "Blyth"
        },
        {
            "type": "CityRegion",
            "value": "Bobcaygeon"
        },
        {
            "type": "CityRegion",
            "value": "Bolton East"
        },
        {
            "type": "CityRegion",
            "value": "Bolton North"
        },
        {
            "type": "CityRegion",
            "value": "Bolton West"
        },
        {
            "type": "CityRegion",
            "value": "Bond Head"
        },
        {
            "type": "CityRegion",
            "value": "Bonnington"
        },
        {
            "type": "CityRegion",
            "value": "Bothwell"
        },
        {
            "type": "CityRegion",
            "value": "Bowes"
        },
        {
            "type": "CityRegion",
            "value": "Bowmanville"
        },
        {
            "type": "CityRegion",
            "value": "Box Grove"
        },
        {
            "type": "CityRegion",
            "value": "Bradford"
        },
        {
            "type": "CityRegion",
            "value": "Braemar"
        },
        {
            "type": "CityRegion",
            "value": "Bram East"
        },
        {
            "type": "CityRegion",
            "value": "Bram West"
        },
        {
            "type": "CityRegion",
            "value": "Bramalea North Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Bramalea Road South Gateway"
        },
        {
            "type": "CityRegion",
            "value": "Bramalea South Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Bramalea West Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Brampton East"
        },
        {
            "type": "CityRegion",
            "value": "Brampton East Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Brampton North"
        },
        {
            "type": "CityRegion",
            "value": "Brampton South"
        },
        {
            "type": "CityRegion",
            "value": "Brampton West"
        },
        {
            "type": "CityRegion",
            "value": "Brant"
        },
        {
            "type": "CityRegion",
            "value": "Brant Hills"
        },
        {
            "type": "CityRegion",
            "value": "Brantford Twp"
        },
        {
            "type": "CityRegion",
            "value": "Brechin"
        },
        {
            "type": "CityRegion",
            "value": "Briar Hill-Belgravia"
        },
        {
            "type": "CityRegion",
            "value": "Bridle Path-Sunnybrook-York Mills"
        },
        {
            "type": "CityRegion",
            "value": "Brighton"
        },
        {
            "type": "CityRegion",
            "value": "Bristol-London"
        },
        {
            "type": "CityRegion",
            "value": "Broadview North"
        },
        {
            "type": "CityRegion",
            "value": "Broadway"
        },
        {
            "type": "CityRegion",
            "value": "Brock Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Brock Ridge"
        },
        {
            "type": "CityRegion",
            "value": "Brockton"
        },
        {
            "type": "CityRegion",
            "value": "Bronte East"
        },
        {
            "type": "CityRegion",
            "value": "Bronte Meadows"
        },
        {
            "type": "CityRegion",
            "value": "Bronte West"
        },
        {
            "type": "CityRegion",
            "value": "Brooke Alvinston"
        },
        {
            "type": "CityRegion",
            "value": "Brookhaven-Amesbury"
        },
        {
            "type": "CityRegion",
            "value": "Brooklin"
        },
        {
            "type": "CityRegion",
            "value": "Brookville"
        },
        {
            "type": "CityRegion",
            "value": "Broughton"
        },
        {
            "type": "CityRegion",
            "value": "Brown"
        },
        {
            "type": "CityRegion",
            "value": "Brownridge"
        },
        {
            "type": "CityRegion",
            "value": "Brownsville"
        },
        {
            "type": "CityRegion",
            "value": "Bruleville"
        },
        {
            "type": "CityRegion",
            "value": "Brussels"
        },
        {
            "type": "CityRegion",
            "value": "Bryanston"
        },
        {
            "type": "CityRegion",
            "value": "Buchanan"
        },
        {
            "type": "CityRegion",
            "value": "Bullock"
        },
        {
            "type": "CityRegion",
            "value": "Bunting/Linwell"
        },
        {
            "type": "CityRegion",
            "value": "Burford"
        },
        {
            "type": "CityRegion",
            "value": "Burkholme"
        },
        {
            "type": "CityRegion",
            "value": "Burleigh Hill"
        },
        {
            "type": "CityRegion",
            "value": "Burnt River"
        },
        {
            "type": "CityRegion",
            "value": "Butler"
        },
        {
            "type": "CityRegion",
            "value": "Buttonville"
        },
        {
            "type": "CityRegion",
            "value": "Cabbagetown-South St. James Town"
        },
        {
            "type": "CityRegion",
            "value": "Cachet"
        },
        {
            "type": "CityRegion",
            "value": "Caledon East"
        },
        {
            "type": "CityRegion",
            "value": "Caledon Village"
        },
        {
            "type": "CityRegion",
            "value": "Caledonia-Fairbank"
        },
        {
            "type": "CityRegion",
            "value": "Cameron"
        },
        {
            "type": "CityRegion",
            "value": "Campbellford"
        },
        {
            "type": "CityRegion",
            "value": "Campbellville"
        },
        {
            "type": "CityRegion",
            "value": "Cannington"
        },
        {
            "type": "CityRegion",
            "value": "Caradoc"
        },
        {
            "type": "CityRegion",
            "value": "Carlisle"
        },
        {
            "type": "CityRegion",
            "value": "Carlton/Bunting"
        },
        {
            "type": "CityRegion",
            "value": "Carpenter"
        },
        {
            "type": "CityRegion",
            "value": "Casa Loma"
        },
        {
            "type": "CityRegion",
            "value": "Casey"
        },
        {
            "type": "CityRegion",
            "value": "Castleton"
        },
        {
            "type": "CityRegion",
            "value": "Cathedraltown"
        },
        {
            "type": "CityRegion",
            "value": "Cedar Grove"
        },
        {
            "type": "CityRegion",
            "value": "Cedarwood"
        },
        {
            "type": "CityRegion",
            "value": "Centennial"
        },
        {
            "type": "CityRegion",
            "value": "Centennial Scarborough"
        },
        {
            "type": "CityRegion",
            "value": "Central"
        },
        {
            "type": "CityRegion",
            "value": "Central Ave"
        },
        {
            "type": "CityRegion",
            "value": "Central City East"
        },
        {
            "type": "CityRegion",
            "value": "Central City West"
        },
        {
            "type": "CityRegion",
            "value": "Central East"
        },
        {
            "type": "CityRegion",
            "value": "Central Erin Mills"
        },
        {
            "type": "CityRegion",
            "value": "Central Newmarket"
        },
        {
            "type": "CityRegion",
            "value": "Central Park"
        },
        {
            "type": "CityRegion",
            "value": "Central West"
        },
        {
            "type": "CityRegion",
            "value": "Centralia"
        },
        {
            "type": "CityRegion",
            "value": "Centre Vespra"
        },
        {
            "type": "CityRegion",
            "value": "Centremount"
        },
        {
            "type": "CityRegion",
            "value": "Chappel"
        },
        {
            "type": "CityRegion",
            "value": "Chatham"
        },
        {
            "type": "CityRegion",
            "value": "Chatham-Kent"
        },
        {
            "type": "CityRegion",
            "value": "Chatsworth"
        },
        {
            "type": "CityRegion",
            "value": "Chedoke Park"
        },
        {
            "type": "CityRegion",
            "value": "Cheltenham"
        },
        {
            "type": "CityRegion",
            "value": "Cherrywood"
        },
        {
            "type": "CityRegion",
            "value": "Chippawa"
        },
        {
            "type": "CityRegion",
            "value": "Church's Lane"
        },
        {
            "type": "CityRegion",
            "value": "Church-Yonge Corridor"
        },
        {
            "type": "CityRegion",
            "value": "Churchill"
        },
        {
            "type": "CityRegion",
            "value": "Churchill Meadows"
        },
        {
            "type": "CityRegion",
            "value": "City Centre"
        },
        {
            "type": "CityRegion",
            "value": "City North of 401"
        },
        {
            "type": "CityRegion",
            "value": "City Northwest"
        },
        {
            "type": "CityRegion",
            "value": "City SouthWest"
        },
        {
            "type": "CityRegion",
            "value": "Claireville Conservation"
        },
        {
            "type": "CityRegion",
            "value": "Clairfields"
        },
        {
            "type": "CityRegion",
            "value": "Clairlea-Birchmount"
        },
        {
            "type": "CityRegion",
            "value": "Clanton Park"
        },
        {
            "type": "CityRegion",
            "value": "Clarke"
        },
        {
            "type": "CityRegion",
            "value": "Clarkson"
        },
        {
            "type": "CityRegion",
            "value": "Clear Creek"
        },
        {
            "type": "CityRegion",
            "value": "Clearview"
        },
        {
            "type": "CityRegion",
            "value": "Cliffcrest"
        },
        {
            "type": "CityRegion",
            "value": "Clifford"
        },
        {
            "type": "CityRegion",
            "value": "Clinton"
        },
        {
            "type": "CityRegion",
            "value": "Coates"
        },
        {
            "type": "CityRegion",
            "value": "Cobban"
        },
        {
            "type": "CityRegion",
            "value": "Coboconk"
        },
        {
            "type": "CityRegion",
            "value": "Cobourg"
        },
        {
            "type": "CityRegion",
            "value": "Codrington"
        },
        {
            "type": "CityRegion",
            "value": "Colborne"
        },
        {
            "type": "CityRegion",
            "value": "Colborne Twp"
        },
        {
            "type": "CityRegion",
            "value": "Coldwater"
        },
        {
            "type": "CityRegion",
            "value": "Colgan"
        },
        {
            "type": "CityRegion",
            "value": "College"
        },
        {
            "type": "CityRegion",
            "value": "College Park"
        },
        {
            "type": "CityRegion",
            "value": "Collingwood"
        },
        {
            "type": "CityRegion",
            "value": "Commerce Valley"
        },
        {
            "type": "CityRegion",
            "value": "Concord"
        },
        {
            "type": "CityRegion",
            "value": "Confederation Heights"
        },
        {
            "type": "CityRegion",
            "value": "Confederation Park"
        },
        {
            "type": "CityRegion",
            "value": "Cooks Mills"
        },
        {
            "type": "CityRegion",
            "value": "Cookstown"
        },
        {
            "type": "CityRegion",
            "value": "Cooksville"
        },
        {
            "type": "CityRegion",
            "value": "Corinth"
        },
        {
            "type": "CityRegion",
            "value": "Corktown"
        },
        {
            "type": "CityRegion",
            "value": "Corman"
        },
        {
            "type": "CityRegion",
            "value": "Cornell"
        },
        {
            "type": "CityRegion",
            "value": "Corso Italia-Davenport"
        },
        {
            "type": "CityRegion",
            "value": "Courtice"
        },
        {
            "type": "CityRegion",
            "value": "Courtland"
        },
        {
            "type": "CityRegion",
            "value": "Coyle Creek"
        },
        {
            "type": "CityRegion",
            "value": "Craighurst"
        },
        {
            "type": "CityRegion",
            "value": "Crampton"
        },
        {
            "type": "CityRegion",
            "value": "Credit Valley"
        },
        {
            "type": "CityRegion",
            "value": "Crediton"
        },
        {
            "type": "CityRegion",
            "value": "Creditview"
        },
        {
            "type": "CityRegion",
            "value": "Creemore"
        },
        {
            "type": "CityRegion",
            "value": "Crerar"
        },
        {
            "type": "CityRegion",
            "value": "Crescent Park"
        },
        {
            "type": "CityRegion",
            "value": "Crescent Town"
        },
        {
            "type": "CityRegion",
            "value": "Crestwood-Springfarm-Yorkhill"
        },
        {
            "type": "CityRegion",
            "value": "Crosby"
        },
        {
            "type": "CityRegion",
            "value": "Crown Point"
        },
        {
            "type": "CityRegion",
            "value": "Crystal Beach"
        },
        {
            "type": "CityRegion",
            "value": "Cumberland"
        },
        {
            "type": "CityRegion",
            "value": "Cundles East"
        },
        {
            "type": "CityRegion",
            "value": "Curve Lake First Nation"
        },
        {
            "type": "CityRegion",
            "value": "Dain City"
        },
        {
            "type": "CityRegion",
            "value": "Danforth"
        },
        {
            "type": "CityRegion",
            "value": "Danforth Village-East York"
        },
        {
            "type": "CityRegion",
            "value": "Dashwood"
        },
        {
            "type": "CityRegion",
            "value": "Delaware Town"
        },
        {
            "type": "CityRegion",
            "value": "Delhi"
        },
        {
            "type": "CityRegion",
            "value": "Delta"
        },
        {
            "type": "CityRegion",
            "value": "Dempsey"
        },
        {
            "type": "CityRegion",
            "value": "Denfield"
        },
        {
            "type": "CityRegion",
            "value": "Derry Green Business Park"
        },
        {
            "type": "CityRegion",
            "value": "Devil's Elbow"
        },
        {
            "type": "CityRegion",
            "value": "Devonsleigh"
        },
        {
            "type": "CityRegion",
            "value": "Dixie"
        },
        {
            "type": "CityRegion",
            "value": "Don Valley Village"
        },
        {
            "type": "CityRegion",
            "value": "Doncrest"
        },
        {
            "type": "CityRegion",
            "value": "Donevan"
        },
        {
            "type": "CityRegion",
            "value": "Dorchester"
        },
        {
            "type": "CityRegion",
            "value": "Dorset Park"
        },
        {
            "type": "CityRegion",
            "value": "Dovercourt-Wallace Emerson-Junction"
        },
        {
            "type": "CityRegion",
            "value": "Downsview-Roding-CFB"
        },
        {
            "type": "CityRegion",
            "value": "Downtown"
        },
        {
            "type": "CityRegion",
            "value": "Downtown Brampton"
        },
        {
            "type": "CityRegion",
            "value": "Downtown Whitby"
        },
        {
            "type": "CityRegion",
            "value": "Drayton"
        },
        {
            "type": "CityRegion",
            "value": "Dresden"
        },
        {
            "type": "CityRegion",
            "value": "Drumbo"
        },
        {
            "type": "CityRegion",
            "value": "Dublin"
        },
        {
            "type": "CityRegion",
            "value": "Dufferin Grove"
        },
        {
            "type": "CityRegion",
            "value": "Duffin Heights"
        },
        {
            "type": "CityRegion",
            "value": "Dunbarton"
        },
        {
            "type": "CityRegion",
            "value": "Dundalk"
        },
        {
            "type": "CityRegion",
            "value": "Dundas"
        },
        {
            "type": "CityRegion",
            "value": "Dundurn"
        },
        {
            "type": "CityRegion",
            "value": "Dunnville"
        },
        {
            "type": "CityRegion",
            "value": "Dunsford"
        },
        {
            "type": "CityRegion",
            "value": "Durand"
        },
        {
            "type": "CityRegion",
            "value": "Durham"
        },
        {
            "type": "CityRegion",
            "value": "Dutton"
        },
        {
            "type": "CityRegion",
            "value": "E. Chester"
        },
        {
            "type": "CityRegion",
            "value": "East A"
        },
        {
            "type": "CityRegion",
            "value": "East B"
        },
        {
            "type": "CityRegion",
            "value": "East Bayfield"
        },
        {
            "type": "CityRegion",
            "value": "East C"
        },
        {
            "type": "CityRegion",
            "value": "East Credit"
        },
        {
            "type": "CityRegion",
            "value": "East D"
        },
        {
            "type": "CityRegion",
            "value": "East E"
        },
        {
            "type": "CityRegion",
            "value": "East End-Danforth"
        },
        {
            "type": "CityRegion",
            "value": "East F"
        },
        {
            "type": "CityRegion",
            "value": "East G"
        },
        {
            "type": "CityRegion",
            "value": "East Gardiners Rd"
        },
        {
            "type": "CityRegion",
            "value": "East H"
        },
        {
            "type": "CityRegion",
            "value": "East I"
        },
        {
            "type": "CityRegion",
            "value": "East J"
        },
        {
            "type": "CityRegion",
            "value": "East K"
        },
        {
            "type": "CityRegion",
            "value": "East L"
        },
        {
            "type": "CityRegion",
            "value": "East M"
        },
        {
            "type": "CityRegion",
            "value": "East N"
        },
        {
            "type": "CityRegion",
            "value": "East O"
        },
        {
            "type": "CityRegion",
            "value": "East P"
        },
        {
            "type": "CityRegion",
            "value": "East Q"
        },
        {
            "type": "CityRegion",
            "value": "East Woodbridge"
        },
        {
            "type": "CityRegion",
            "value": "East York"
        },
        {
            "type": "CityRegion",
            "value": "East of Sir John A. Blvd"
        },
        {
            "type": "CityRegion",
            "value": "Eastdale"
        },
        {
            "type": "CityRegion",
            "value": "Eastlake"
        },
        {
            "type": "CityRegion",
            "value": "Eastmount"
        },
        {
            "type": "CityRegion",
            "value": "Eden"
        },
        {
            "type": "CityRegion",
            "value": "Eden Mills"
        },
        {
            "type": "CityRegion",
            "value": "Edenbridge-Humber Valley"
        },
        {
            "type": "CityRegion",
            "value": "Edgar"
        },
        {
            "type": "CityRegion",
            "value": "Edgehill Drive"
        },
        {
            "type": "CityRegion",
            "value": "Eglinton East"
        },
        {
            "type": "CityRegion",
            "value": "Elder Mills"
        },
        {
            "type": "CityRegion",
            "value": "Eleanor"
        },
        {
            "type": "CityRegion",
            "value": "Elms-Old Rexdale"
        },
        {
            "type": "CityRegion",
            "value": "Elmvale"
        },
        {
            "type": "CityRegion",
            "value": "Elora/Salem"
        },
        {
            "type": "CityRegion",
            "value": "Embro"
        },
        {
            "type": "CityRegion",
            "value": "Englemount-Lawrence"
        },
        {
            "type": "CityRegion",
            "value": "Erieau"
        },
        {
            "type": "CityRegion",
            "value": "Erin"
        },
        {
            "type": "CityRegion",
            "value": "Erin Mills"
        },
        {
            "type": "CityRegion",
            "value": "Erindale"
        },
        {
            "type": "CityRegion",
            "value": "Eringate-Centennial-West Deane"
        },
        {
            "type": "CityRegion",
            "value": "Esquesing"
        },
        {
            "type": "CityRegion",
            "value": "Essex"
        },
        {
            "type": "CityRegion",
            "value": "Etobicoke West Mall"
        },
        {
            "type": "CityRegion",
            "value": "Everett"
        },
        {
            "type": "CityRegion",
            "value": "Exeter"
        },
        {
            "type": "CityRegion",
            "value": "Exhibition Park"
        },
        {
            "type": "CityRegion",
            "value": "Facer"
        },
        {
            "type": "CityRegion",
            "value": "Fairview"
        },
        {
            "type": "CityRegion",
            "value": "Falkirk"
        },
        {
            "type": "CityRegion",
            "value": "Farewell"
        },
        {
            "type": "CityRegion",
            "value": "Fenelon Falls"
        },
        {
            "type": "CityRegion",
            "value": "Fenwick"
        },
        {
            "type": "CityRegion",
            "value": "Fergus"
        },
        {
            "type": "CityRegion",
            "value": "Fessenden"
        },
        {
            "type": "CityRegion",
            "value": "Fesserton"
        },
        {
            "type": "CityRegion",
            "value": "Fingal"
        },
        {
            "type": "CityRegion",
            "value": "Flemingdon Park"
        },
        {
            "type": "CityRegion",
            "value": "Flesherton"
        },
        {
            "type": "CityRegion",
            "value": "Fletcher's Creek South"
        },
        {
            "type": "CityRegion",
            "value": "Fletcher's Creek Village"
        },
        {
            "type": "CityRegion",
            "value": "Fletcher's Meadow"
        },
        {
            "type": "CityRegion",
            "value": "Fletcher's West"
        },
        {
            "type": "CityRegion",
            "value": "Fonthill"
        },
        {
            "type": "CityRegion",
            "value": "Ford"
        },
        {
            "type": "CityRegion",
            "value": "Forest"
        },
        {
            "type": "CityRegion",
            "value": "Forest Hill North"
        },
        {
            "type": "CityRegion",
            "value": "Forest Hill South"
        },
        {
            "type": "CityRegion",
            "value": "Forestview"
        },
        {
            "type": "CityRegion",
            "value": "Fox Island"
        },
        {
            "type": "CityRegion",
            "value": "Freelton"
        },
        {
            "type": "CityRegion",
            "value": "Freeman"
        },
        {
            "type": "CityRegion",
            "value": "Frogmore"
        },
        {
            "type": "CityRegion",
            "value": "Front of Leeds & Seeleys Bay"
        },
        {
            "type": "CityRegion",
            "value": "Frontenac Centre"
        },
        {
            "type": "CityRegion",
            "value": "Frontenac North"
        },
        {
            "type": "CityRegion",
            "value": "Frontenac South"
        },
        {
            "type": "CityRegion",
            "value": "Fruitland"
        },
        {
            "type": "CityRegion",
            "value": "Gananoque"
        },
        {
            "type": "CityRegion",
            "value": "Garden Hill"
        },
        {
            "type": "CityRegion",
            "value": "Gateway"
        },
        {
            "type": "CityRegion",
            "value": "Georgetown"
        },
        {
            "type": "CityRegion",
            "value": "Georgian Drive"
        },
        {
            "type": "CityRegion",
            "value": "Georgina Island"
        },
        {
            "type": "CityRegion",
            "value": "German Mills"
        },
        {
            "type": "CityRegion",
            "value": "Gershome"
        },
        {
            "type": "CityRegion",
            "value": "Gibson"
        },
        {
            "type": "CityRegion",
            "value": "Gilbert"
        },
        {
            "type": "CityRegion",
            "value": "Gilford"
        },
        {
            "type": "CityRegion",
            "value": "Gilkson"
        },
        {
            "type": "CityRegion",
            "value": "Glen Abbey"
        },
        {
            "type": "CityRegion",
            "value": "Glen Shields"
        },
        {
            "type": "CityRegion",
            "value": "Glen Williams"
        },
        {
            "type": "CityRegion",
            "value": "Glencairn"
        },
        {
            "type": "CityRegion",
            "value": "Glencoe"
        },
        {
            "type": "CityRegion",
            "value": "Glendale"
        },
        {
            "type": "CityRegion",
            "value": "Glendale/Glenridge"
        },
        {
            "type": "CityRegion",
            "value": "Glenfield-Jane Heights"
        },
        {
            "type": "CityRegion",
            "value": "Glenview"
        },
        {
            "type": "CityRegion",
            "value": "Glenway Estates"
        },
        {
            "type": "CityRegion",
            "value": "Gloucester"
        },
        {
            "type": "CityRegion",
            "value": "Goderich Town"
        },
        {
            "type": "CityRegion",
            "value": "Goderich Twp"
        },
        {
            "type": "CityRegion",
            "value": "Gore Industrial North"
        },
        {
            "type": "CityRegion",
            "value": "Gore Industrial South"
        },
        {
            "type": "CityRegion",
            "value": "Goreway Drive Corridor"
        },
        {
            "type": "CityRegion",
            "value": "Gorham-College Manor"
        },
        {
            "type": "CityRegion",
            "value": "Gourley"
        },
        {
            "type": "CityRegion",
            "value": "Gowanstown"
        },
        {
            "type": "CityRegion",
            "value": "Grafton"
        },
        {
            "type": "CityRegion",
            "value": "Grand Bend"
        },
        {
            "type": "CityRegion",
            "value": "Grand Valley"
        },
        {
            "type": "CityRegion",
            "value": "Grandview"
        },
        {
            "type": "CityRegion",
            "value": "Grange Hill East"
        },
        {
            "type": "CityRegion",
            "value": "Granton"
        },
        {
            "type": "CityRegion",
            "value": "Grapeview"
        },
        {
            "type": "CityRegion",
            "value": "Grayside"
        },
        {
            "type": "CityRegion",
            "value": "Greater Napanee"
        },
        {
            "type": "CityRegion",
            "value": "Greenford"
        },
        {
            "type": "CityRegion",
            "value": "Greeningdon"
        },
        {
            "type": "CityRegion",
            "value": "Greensborough"
        },
        {
            "type": "CityRegion",
            "value": "Greensville"
        },
        {
            "type": "CityRegion",
            "value": "Greenwood-Coxwell"
        },
        {
            "type": "CityRegion",
            "value": "Grimsby Beach"
        },
        {
            "type": "CityRegion",
            "value": "Grimsby East"
        },
        {
            "type": "CityRegion",
            "value": "Grimsby Escarpment"
        },
        {
            "type": "CityRegion",
            "value": "Grimsby West"
        },
        {
            "type": "CityRegion",
            "value": "Grindstone"
        },
        {
            "type": "CityRegion",
            "value": "Grove East"
        },
        {
            "type": "CityRegion",
            "value": "Guelph South"
        },
        {
            "type": "CityRegion",
            "value": "Guildwood"
        },
        {
            "type": "CityRegion",
            "value": "Gurnett"
        },
        {
            "type": "CityRegion",
            "value": "Guthrie"
        },
        {
            "type": "CityRegion",
            "value": "Haldimand"
        },
        {
            "type": "CityRegion",
            "value": "Hallowell"
        },
        {
            "type": "CityRegion",
            "value": "Hamilton Beach"
        },
        {
            "type": "CityRegion",
            "value": "Hampton Heights"
        },
        {
            "type": "CityRegion",
            "value": "Hanlon Creek"
        },
        {
            "type": "CityRegion",
            "value": "Hanlon Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Hannon"
        },
        {
            "type": "CityRegion",
            "value": "Hanover"
        },
        {
            "type": "CityRegion",
            "value": "Harding"
        },
        {
            "type": "CityRegion",
            "value": "Harrison"
        },
        {
            "type": "CityRegion",
            "value": "Harriston"
        },
        {
            "type": "CityRegion",
            "value": "Hastings"
        },
        {
            "type": "CityRegion",
            "value": "Havelock"
        },
        {
            "type": "CityRegion",
            "value": "Hawkestone"
        },
        {
            "type": "CityRegion",
            "value": "Hay Twp"
        },
        {
            "type": "CityRegion",
            "value": "Headford Business Park"
        },
        {
            "type": "CityRegion",
            "value": "Headon"
        },
        {
            "type": "CityRegion",
            "value": "Heart Lake"
        },
        {
            "type": "CityRegion",
            "value": "Heart Lake East"
        },
        {
            "type": "CityRegion",
            "value": "Heart Lake West"
        },
        {
            "type": "CityRegion",
            "value": "Henry Farm"
        },
        {
            "type": "CityRegion",
            "value": "Hensall"
        },
        {
            "type": "CityRegion",
            "value": "Hiawatha First Nation"
        },
        {
            "type": "CityRegion",
            "value": "High Park North"
        },
        {
            "type": "CityRegion",
            "value": "High Park-Swansea"
        },
        {
            "type": "CityRegion",
            "value": "Highbush"
        },
        {
            "type": "CityRegion",
            "value": "Highgate"
        },
        {
            "type": "CityRegion",
            "value": "Highland Creek"
        },
        {
            "type": "CityRegion",
            "value": "Highway 427"
        },
        {
            "type": "CityRegion",
            "value": "Hill Park"
        },
        {
            "type": "CityRegion",
            "value": "Hillcrest Village"
        },
        {
            "type": "CityRegion",
            "value": "Hillier"
        },
        {
            "type": "CityRegion",
            "value": "Hills of St Andrew"
        },
        {
            "type": "CityRegion",
            "value": "Hillsburgh"
        },
        {
            "type": "CityRegion",
            "value": "Hillsdale"
        },
        {
            "type": "CityRegion",
            "value": "Historic Lakeshore Communities"
        },
        {
            "type": "CityRegion",
            "value": "Hockley"
        },
        {
            "type": "CityRegion",
            "value": "Holland Landing"
        },
        {
            "type": "CityRegion",
            "value": "Holly"
        },
        {
            "type": "CityRegion",
            "value": "Homeside"
        },
        {
            "type": "CityRegion",
            "value": "Horseshoe Valley"
        },
        {
            "type": "CityRegion",
            "value": "Howick Twp"
        },
        {
            "type": "CityRegion",
            "value": "Humber Heights"
        },
        {
            "type": "CityRegion",
            "value": "Humber Summit"
        },
        {
            "type": "CityRegion",
            "value": "Humberlea-Pelmo Park W4"
        },
        {
            "type": "CityRegion",
            "value": "Humberlea-Pelmo Park W5"
        },
        {
            "type": "CityRegion",
            "value": "Humbermede"
        },
        {
            "type": "CityRegion",
            "value": "Humewood-Cedarvale"
        },
        {
            "type": "CityRegion",
            "value": "Huntington"
        },
        {
            "type": "CityRegion",
            "value": "Huron Heights-Leslie Valley"
        },
        {
            "type": "CityRegion",
            "value": "Huron-Kinloss"
        },
        {
            "type": "CityRegion",
            "value": "Hurontario"
        },
        {
            "type": "CityRegion",
            "value": "Hurricane/Merrittville"
        },
        {
            "type": "CityRegion",
            "value": "Huttonville"
        },
        {
            "type": "CityRegion",
            "value": "Hwy 406/Welland"
        },
        {
            "type": "CityRegion",
            "value": "Ilderton"
        },
        {
            "type": "CityRegion",
            "value": "Inch Park"
        },
        {
            "type": "CityRegion",
            "value": "Industrial Burlington"
        },
        {
            "type": "CityRegion",
            "value": "Industrial Sector"
        },
        {
            "type": "CityRegion",
            "value": "Ingersoll"
        },
        {
            "type": "CityRegion",
            "value": "Ingersoll - North"
        },
        {
            "type": "CityRegion",
            "value": "Ingersoll - South"
        },
        {
            "type": "CityRegion",
            "value": "Inglewood"
        },
        {
            "type": "CityRegion",
            "value": "Innerkip"
        },
        {
            "type": "CityRegion",
            "value": "Innis-Shore"
        },
        {
            "type": "CityRegion",
            "value": "Iona"
        },
        {
            "type": "CityRegion",
            "value": "Iona Station"
        },
        {
            "type": "CityRegion",
            "value": "Ionview"
        },
        {
            "type": "CityRegion",
            "value": "Iroquois Ridge North"
        },
        {
            "type": "CityRegion",
            "value": "Iroquois Ridge South"
        },
        {
            "type": "CityRegion",
            "value": "Islington Woods"
        },
        {
            "type": "CityRegion",
            "value": "Islington-City Centre West"
        },
        {
            "type": "CityRegion",
            "value": "Janetville"
        },
        {
            "type": "CityRegion",
            "value": "Jefferson"
        },
        {
            "type": "CityRegion",
            "value": "Jerome"
        },
        {
            "type": "CityRegion",
            "value": "Jerseyville"
        },
        {
            "type": "CityRegion",
            "value": "Junction Area"
        },
        {
            "type": "CityRegion",
            "value": "June Avenue"
        },
        {
            "type": "CityRegion",
            "value": "Kanata"
        },
        {
            "type": "CityRegion",
            "value": "Kedron"
        },
        {
            "type": "CityRegion",
            "value": "Keelesdale-Eglinton West"
        },
        {
            "type": "CityRegion",
            "value": "Kelvin"
        },
        {
            "type": "CityRegion",
            "value": "Kennedy"
        },
        {
            "type": "CityRegion",
            "value": "Kennedy Park"
        },
        {
            "type": "CityRegion",
            "value": "Kensington-Chinatown"
        },
        {
            "type": "CityRegion",
            "value": "Kentley"
        },
        {
            "type": "CityRegion",
            "value": "Kernighan"
        },
        {
            "type": "CityRegion",
            "value": "Keswick North"
        },
        {
            "type": "CityRegion",
            "value": "Keswick South"
        },
        {
            "type": "CityRegion",
            "value": "Kilworth"
        },
        {
            "type": "CityRegion",
            "value": "Kincardine"
        },
        {
            "type": "CityRegion",
            "value": "King City"
        },
        {
            "type": "CityRegion",
            "value": "Kingston East (Incl Barret Crt)"
        },
        {
            "type": "CityRegion",
            "value": "Kingston East (Incl CFB Kingston)"
        },
        {
            "type": "CityRegion",
            "value": "Kingsview Village-The Westway"
        },
        {
            "type": "CityRegion",
            "value": "Kingsville"
        },
        {
            "type": "CityRegion",
            "value": "Kingsway South"
        },
        {
            "type": "CityRegion",
            "value": "Kinmount"
        },
        {
            "type": "CityRegion",
            "value": "Kintail"
        },
        {
            "type": "CityRegion",
            "value": "Kintore"
        },
        {
            "type": "CityRegion",
            "value": "Kirkendall"
        },
        {
            "type": "CityRegion",
            "value": "Kirkfield"
        },
        {
            "type": "CityRegion",
            "value": "Kleinburg"
        },
        {
            "type": "CityRegion",
            "value": "Komoka"
        },
        {
            "type": "CityRegion",
            "value": "Kortright Hills"
        },
        {
            "type": "CityRegion",
            "value": "L'Amoreaux"
        },
        {
            "type": "CityRegion",
            "value": "LaSalette"
        },
        {
            "type": "CityRegion",
            "value": "LaSalle"
        },
        {
            "type": "CityRegion",
            "value": "Lafontaine"
        },
        {
            "type": "CityRegion",
            "value": "Lakefield"
        },
        {
            "type": "CityRegion",
            "value": "Lakeport"
        },
        {
            "type": "CityRegion",
            "value": "Lakeshore"
        },
        {
            "type": "CityRegion",
            "value": "Lakeview"
        },
        {
            "type": "CityRegion",
            "value": "Lakeview Estates"
        },
        {
            "type": "CityRegion",
            "value": "Lambton Baby Point"
        },
        {
            "type": "CityRegion",
            "value": "Lambton Shores"
        },
        {
            "type": "CityRegion",
            "value": "Landsdale"
        },
        {
            "type": "CityRegion",
            "value": "Langstaff"
        },
        {
            "type": "CityRegion",
            "value": "Langton"
        },
        {
            "type": "CityRegion",
            "value": "Lansdowne Village"
        },
        {
            "type": "CityRegion",
            "value": "Lansing-Westgate"
        },
        {
            "type": "CityRegion",
            "value": "Larder/Virginiatown"
        },
        {
            "type": "CityRegion",
            "value": "Lawfield"
        },
        {
            "type": "CityRegion",
            "value": "Lawrence Park North"
        },
        {
            "type": "CityRegion",
            "value": "Lawrence Park South"
        },
        {
            "type": "CityRegion",
            "value": "Leamington"
        },
        {
            "type": "CityRegion",
            "value": "Leaside"
        },
        {
            "type": "CityRegion",
            "value": "Lefroy"
        },
        {
            "type": "CityRegion",
            "value": "Legacy"
        },
        {
            "type": "CityRegion",
            "value": "Lennox and Addington - South"
        },
        {
            "type": "CityRegion",
            "value": "Letitia Heights"
        },
        {
            "type": "CityRegion",
            "value": "Limehouse"
        },
        {
            "type": "CityRegion",
            "value": "Lincoln"
        },
        {
            "type": "CityRegion",
            "value": "Lincoln Lake"
        },
        {
            "type": "CityRegion",
            "value": "Lincoln/Crowland"
        },
        {
            "type": "CityRegion",
            "value": "Lindsay"
        },
        {
            "type": "CityRegion",
            "value": "Lisgar"
        },
        {
            "type": "CityRegion",
            "value": "Lisle"
        },
        {
            "type": "CityRegion",
            "value": "Little Britain"
        },
        {
            "type": "CityRegion",
            "value": "Little Lake"
        },
        {
            "type": "CityRegion",
            "value": "Little Portugal"
        },
        {
            "type": "CityRegion",
            "value": "Liverpool"
        },
        {
            "type": "CityRegion",
            "value": "Long Branch"
        },
        {
            "type": "CityRegion",
            "value": "Long Point"
        },
        {
            "type": "CityRegion",
            "value": "Loretto"
        },
        {
            "type": "CityRegion",
            "value": "Lorne Park"
        },
        {
            "type": "CityRegion",
            "value": "Lucan"
        },
        {
            "type": "CityRegion",
            "value": "Lucknow"
        },
        {
            "type": "CityRegion",
            "value": "Lynde Creek"
        },
        {
            "type": "CityRegion",
            "value": "Lynden"
        },
        {
            "type": "CityRegion",
            "value": "Lynhurst"
        },
        {
            "type": "CityRegion",
            "value": "Lyons"
        },
        {
            "type": "CityRegion",
            "value": "Macassa"
        },
        {
            "type": "CityRegion",
            "value": "Madoc"
        },
        {
            "type": "CityRegion",
            "value": "Main Street"
        },
        {
            "type": "CityRegion",
            "value": "Malahide"
        },
        {
            "type": "CityRegion",
            "value": "Malton"
        },
        {
            "type": "CityRegion",
            "value": "Malvern"
        },
        {
            "type": "CityRegion",
            "value": "Manilla"
        },
        {
            "type": "CityRegion",
            "value": "Maple"
        },
        {
            "type": "CityRegion",
            "value": "Maple Leaf"
        },
        {
            "type": "CityRegion",
            "value": "Marchmont"
        },
        {
            "type": "CityRegion",
            "value": "Markdale"
        },
        {
            "type": "CityRegion",
            "value": "Markham Village"
        },
        {
            "type": "CityRegion",
            "value": "Markland Wood"
        },
        {
            "type": "CityRegion",
            "value": "Markville"
        },
        {
            "type": "CityRegion",
            "value": "Marshville/Winger"
        },
        {
            "type": "CityRegion",
            "value": "Martindale Pond"
        },
        {
            "type": "CityRegion",
            "value": "Mavis-Erindale"
        },
        {
            "type": "CityRegion",
            "value": "McKillop Twp"
        },
        {
            "type": "CityRegion",
            "value": "McLaughlin"
        },
        {
            "type": "CityRegion",
            "value": "McQuesten"
        },
        {
            "type": "CityRegion",
            "value": "Meadowlands"
        },
        {
            "type": "CityRegion",
            "value": "Meadowvale"
        },
        {
            "type": "CityRegion",
            "value": "Meadowvale Business Park"
        },
        {
            "type": "CityRegion",
            "value": "Meadowvale Village"
        },
        {
            "type": "CityRegion",
            "value": "Meaford"
        },
        {
            "type": "CityRegion",
            "value": "Melbourne"
        },
        {
            "type": "CityRegion",
            "value": "Merlin"
        },
        {
            "type": "CityRegion",
            "value": "Mewburn"
        },
        {
            "type": "CityRegion",
            "value": "Middlefield"
        },
        {
            "type": "CityRegion",
            "value": "Middlemiss"
        },
        {
            "type": "CityRegion",
            "value": "Middlesex Centre"
        },
        {
            "type": "CityRegion",
            "value": "Midhurst"
        },
        {
            "type": "CityRegion",
            "value": "Midland"
        },
        {
            "type": "CityRegion",
            "value": "Mill Pond"
        },
        {
            "type": "CityRegion",
            "value": "Millbrook"
        },
        {
            "type": "CityRegion",
            "value": "Milliken"
        },
        {
            "type": "CityRegion",
            "value": "Milliken Mills East"
        },
        {
            "type": "CityRegion",
            "value": "Milliken Mills West"
        },
        {
            "type": "CityRegion",
            "value": "Milton Heights"
        },
        {
            "type": "CityRegion",
            "value": "Mimico"
        },
        {
            "type": "CityRegion",
            "value": "Mineola"
        },
        {
            "type": "CityRegion",
            "value": "Minesing"
        },
        {
            "type": "CityRegion",
            "value": "Mississauga Valleys"
        },
        {
            "type": "CityRegion",
            "value": "Moffat"
        },
        {
            "type": "CityRegion",
            "value": "Mohawk"
        },
        {
            "type": "CityRegion",
            "value": "Monaghan"
        },
        {
            "type": "CityRegion",
            "value": "Mono Mills"
        },
        {
            "type": "CityRegion",
            "value": "Moonstone"
        },
        {
            "type": "CityRegion",
            "value": "Morningside"
        },
        {
            "type": "CityRegion",
            "value": "Morrison"
        },
        {
            "type": "CityRegion",
            "value": "Morriston"
        },
        {
            "type": "CityRegion",
            "value": "Moss Park"
        },
        {
            "type": "CityRegion",
            "value": "Mossley"
        },
        {
            "type": "CityRegion",
            "value": "Mount Brydges"
        },
        {
            "type": "CityRegion",
            "value": "Mount Dennis"
        },
        {
            "type": "CityRegion",
            "value": "Mount Elgin"
        },
        {
            "type": "CityRegion",
            "value": "Mount Forest"
        },
        {
            "type": "CityRegion",
            "value": "Mount Hope"
        },
        {
            "type": "CityRegion",
            "value": "Mount Olive-Silverstone-Jamestown"
        },
        {
            "type": "CityRegion",
            "value": "Mount Pleasant East"
        },
        {
            "type": "CityRegion",
            "value": "Mount Pleasant West"
        },
        {
            "type": "CityRegion",
            "value": "Mountain View"
        },
        {
            "type": "CityRegion",
            "value": "Mountainside"
        },
        {
            "type": "CityRegion",
            "value": "Mountjoy Rural"
        },
        {
            "type": "CityRegion",
            "value": "Mountview"
        },
        {
            "type": "CityRegion",
            "value": "Mt Albert"
        },
        {
            "type": "CityRegion",
            "value": "Mt. Carmel"
        },
        {
            "type": "CityRegion",
            "value": "Muirkirk"
        },
        {
            "type": "CityRegion",
            "value": "N. Welland"
        },
        {
            "type": "CityRegion",
            "value": "NE"
        },
        {
            "type": "CityRegion",
            "value": "NW"
        },
        {
            "type": "CityRegion",
            "value": "Nairn"
        },
        {
            "type": "CityRegion",
            "value": "Nanticoke"
        },
        {
            "type": "CityRegion",
            "value": "Nashdale"
        },
        {
            "type": "CityRegion",
            "value": "Nassagaweya"
        },
        {
            "type": "CityRegion",
            "value": "Nelson"
        },
        {
            "type": "CityRegion",
            "value": "Nepean"
        },
        {
            "type": "CityRegion",
            "value": "Neustadt"
        },
        {
            "type": "CityRegion",
            "value": "New Glasgow"
        },
        {
            "type": "CityRegion",
            "value": "New Lowell"
        },
        {
            "type": "CityRegion",
            "value": "New Toronto"
        },
        {
            "type": "CityRegion",
            "value": "Newbury"
        },
        {
            "type": "CityRegion",
            "value": "Newcastle"
        },
        {
            "type": "CityRegion",
            "value": "Newmarket Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "Newtonbrook East"
        },
        {
            "type": "CityRegion",
            "value": "Newtonbrook West"
        },
        {
            "type": "CityRegion",
            "value": "Niagara"
        },
        {
            "type": "CityRegion",
            "value": "Nilestown"
        },
        {
            "type": "CityRegion",
            "value": "Nobleton"
        },
        {
            "type": "CityRegion",
            "value": "Norfolk"
        },
        {
            "type": "CityRegion",
            "value": "Norland"
        },
        {
            "type": "CityRegion",
            "value": "Normanhurst"
        },
        {
            "type": "CityRegion",
            "value": "North A"
        },
        {
            "type": "CityRegion",
            "value": "North B"
        },
        {
            "type": "CityRegion",
            "value": "North C"
        },
        {
            "type": "CityRegion",
            "value": "North D"
        },
        {
            "type": "CityRegion",
            "value": "North E"
        },
        {
            "type": "CityRegion",
            "value": "North End"
        },
        {
            "type": "CityRegion",
            "value": "North F"
        },
        {
            "type": "CityRegion",
            "value": "North G"
        },
        {
            "type": "CityRegion",
            "value": "North H"
        },
        {
            "type": "CityRegion",
            "value": "North I"
        },
        {
            "type": "CityRegion",
            "value": "North J"
        },
        {
            "type": "CityRegion",
            "value": "North K"
        },
        {
            "type": "CityRegion",
            "value": "North L"
        },
        {
            "type": "CityRegion",
            "value": "North M"
        },
        {
            "type": "CityRegion",
            "value": "North Marysburgh"
        },
        {
            "type": "CityRegion",
            "value": "North N"
        },
        {
            "type": "CityRegion",
            "value": "North O"
        },
        {
            "type": "CityRegion",
            "value": "North P"
        },
        {
            "type": "CityRegion",
            "value": "North Q"
        },
        {
            "type": "CityRegion",
            "value": "North R"
        },
        {
            "type": "CityRegion",
            "value": "North Richvale"
        },
        {
            "type": "CityRegion",
            "value": "North Riverdale"
        },
        {
            "type": "CityRegion",
            "value": "North S"
        },
        {
            "type": "CityRegion",
            "value": "North Shore"
        },
        {
            "type": "CityRegion",
            "value": "North St. James Town"
        },
        {
            "type": "CityRegion",
            "value": "North T"
        },
        {
            "type": "CityRegion",
            "value": "North of Taylor-Kidd Blvd"
        },
        {
            "type": "CityRegion",
            "value": "Northcrest"
        },
        {
            "type": "CityRegion",
            "value": "Northeast"
        },
        {
            "type": "CityRegion",
            "value": "Northeast Ajax"
        },
        {
            "type": "CityRegion",
            "value": "Northern Bruce Peninsula"
        },
        {
            "type": "CityRegion",
            "value": "Northgate"
        },
        {
            "type": "CityRegion",
            "value": "Northglen"
        },
        {
            "type": "CityRegion",
            "value": "Northwest"
        },
        {
            "type": "CityRegion",
            "value": "Northwest Ajax"
        },
        {
            "type": "CityRegion",
            "value": "Northwest Brampton"
        },
        {
            "type": "CityRegion",
            "value": "Northwest Industrial Park"
        },
        {
            "type": "CityRegion",
            "value": "Northwest Sandalwood Parkway"
        },
        {
            "type": "CityRegion",
            "value": "Northwood"
        },
        {
            "type": "CityRegion",
            "value": "Northwood Park"
        },
        {
            "type": "CityRegion",
            "value": "Norwich Town"
        },
        {
            "type": "CityRegion",
            "value": "Norwood"
        },
        {
            "type": "CityRegion",
            "value": "Nottawa"
        },
        {
            "type": "CityRegion",
            "value": "O'Connor-Parkview"
        },
        {
            "type": "CityRegion",
            "value": "O'Neill"
        },
        {
            "type": "CityRegion",
            "value": "Oak Ridges"
        },
        {
            "type": "CityRegion",
            "value": "Oak Ridges Lake Wilcox"
        },
        {
            "type": "CityRegion",
            "value": "Oakdale"
        },
        {
            "type": "CityRegion",
            "value": "Oakland"
        },
        {
            "type": "CityRegion",
            "value": "Oakridge"
        },
        {
            "type": "CityRegion",
            "value": "Oakwood"
        },
        {
            "type": "CityRegion",
            "value": "Oakwood Village"
        },
        {
            "type": "CityRegion",
            "value": "Oakwood-Vaughan"
        },
        {
            "type": "CityRegion",
            "value": "Observatory"
        },
        {
            "type": "CityRegion",
            "value": "Odessa"
        },
        {
            "type": "CityRegion",
            "value": "Old Glenridge"
        },
        {
            "type": "CityRegion",
            "value": "Old Markham Village"
        },
        {
            "type": "CityRegion",
            "value": "Old Milton"
        },
        {
            "type": "CityRegion",
            "value": "Old Oakville"
        },
        {
            "type": "CityRegion",
            "value": "Old University"
        },
        {
            "type": "CityRegion",
            "value": "Omemee"
        },
        {
            "type": "CityRegion",
            "value": "Onward Willow"
        },
        {
            "type": "CityRegion",
            "value": "Orangeville"
        },
        {
            "type": "CityRegion",
            "value": "Orchard"
        },
        {
            "type": "CityRegion",
            "value": "Orillia"
        },
        {
            "type": "CityRegion",
            "value": "Orono"
        },
        {
            "type": "CityRegion",
            "value": "Orwell"
        },
        {
            "type": "CityRegion",
            "value": "Osgoode"
        },
        {
            "type": "CityRegion",
            "value": "Otonabee"
        },
        {
            "type": "CityRegion",
            "value": "Ottawa"
        },
        {
            "type": "CityRegion",
            "value": "Otterville"
        },
        {
            "type": "CityRegion",
            "value": "Owen Sound"
        },
        {
            "type": "CityRegion",
            "value": "Painswick North"
        },
        {
            "type": "CityRegion",
            "value": "Painswick South"
        },
        {
            "type": "CityRegion",
            "value": "Palermo West"
        },
        {
            "type": "CityRegion",
            "value": "Palgrave"
        },
        {
            "type": "CityRegion",
            "value": "Palmer"
        },
        {
            "type": "CityRegion",
            "value": "Palmerston"
        },
        {
            "type": "CityRegion",
            "value": "Palmerston-Little Italy"
        },
        {
            "type": "CityRegion",
            "value": "Paris"
        },
        {
            "type": "CityRegion",
            "value": "Parkhill"
        },
        {
            "type": "CityRegion",
            "value": "Parkview"
        },
        {
            "type": "CityRegion",
            "value": "Parkway Belt Industrial Area"
        },
        {
            "type": "CityRegion",
            "value": "Parkwood Gardens"
        },
        {
            "type": "CityRegion",
            "value": "Parkwoods-Donalda"
        },
        {
            "type": "CityRegion",
            "value": "Patterson"
        },
        {
            "type": "CityRegion",
            "value": "Pefferlaw"
        },
        {
            "type": "CityRegion",
            "value": "Pelee"
        },
        {
            "type": "CityRegion",
            "value": "Penetanguishene"
        },
        {
            "type": "CityRegion",
            "value": "Petrolia"
        },
        {
            "type": "CityRegion",
            "value": "Phelpston"
        },
        {
            "type": "CityRegion",
            "value": "Picton"
        },
        {
            "type": "CityRegion",
            "value": "Pine Ridge"
        },
        {
            "type": "CityRegion",
            "value": "Pine Valley Business Park"
        },
        {
            "type": "CityRegion",
            "value": "Pinecrest"
        },
        {
            "type": "CityRegion",
            "value": "Plattsville"
        },
        {
            "type": "CityRegion",
            "value": "Playter Estates-Danforth"
        },
        {
            "type": "CityRegion",
            "value": "Pleasant View"
        },
        {
            "type": "CityRegion",
            "value": "Plympton Wyoming"
        },
        {
            "type": "CityRegion",
            "value": "Pontypool"
        },
        {
            "type": "CityRegion",
            "value": "Poplar Hill"
        },
        {
            "type": "CityRegion",
            "value": "Port Bruce"
        },
        {
            "type": "CityRegion",
            "value": "Port Burwell"
        },
        {
            "type": "CityRegion",
            "value": "Port Credit"
        },
        {
            "type": "CityRegion",
            "value": "Port Dalhousie"
        },
        {
            "type": "CityRegion",
            "value": "Port Dover"
        },
        {
            "type": "CityRegion",
            "value": "Port Franks"
        },
        {
            "type": "CityRegion",
            "value": "Port Hope"
        },
        {
            "type": "CityRegion",
            "value": "Port McNicoll"
        },
        {
            "type": "CityRegion",
            "value": "Port Perry"
        },
        {
            "type": "CityRegion",
            "value": "Port Robinson"
        },
        {
            "type": "CityRegion",
            "value": "Port Rowan"
        },
        {
            "type": "CityRegion",
            "value": "Port Severn"
        },
        {
            "type": "CityRegion",
            "value": "Port Stanley"
        },
        {
            "type": "CityRegion",
            "value": "Port Weller"
        },
        {
            "type": "CityRegion",
            "value": "Port Whitby"
        },
        {
            "type": "CityRegion",
            "value": "Pottageville"
        },
        {
            "type": "CityRegion",
            "value": "Priceville"
        },
        {
            "type": "CityRegion",
            "value": "Prince Charles"
        },
        {
            "type": "CityRegion",
            "value": "Princess-Rosethorn"
        },
        {
            "type": "CityRegion",
            "value": "Princeton"
        },
        {
            "type": "CityRegion",
            "value": "Pringle Creek"
        },
        {
            "type": "CityRegion",
            "value": "Putnam"
        },
        {
            "type": "CityRegion",
            "value": "Queen Street Corridor"
        },
        {
            "type": "CityRegion",
            "value": "Queen's Park"
        },
        {
            "type": "CityRegion",
            "value": "Queenston"
        },
        {
            "type": "CityRegion",
            "value": "Queensville"
        },
        {
            "type": "CityRegion",
            "value": "Quinndale"
        },
        {
            "type": "CityRegion",
            "value": "Raglan"
        },
        {
            "type": "CityRegion",
            "value": "Raleigh"
        },
        {
            "type": "CityRegion",
            "value": "Rama First Nation"
        },
        {
            "type": "CityRegion",
            "value": "Randall"
        },
        {
            "type": "CityRegion",
            "value": "Rathwood"
        },
        {
            "type": "CityRegion",
            "value": "Raymerville"
        },
        {
            "type": "CityRegion",
            "value": "Red Hill"
        },
        {
            "type": "CityRegion",
            "value": "Regent Park"
        },
        {
            "type": "CityRegion",
            "value": "Remote Area"
        },
        {
            "type": "CityRegion",
            "value": "Rexdale-Kipling"
        },
        {
            "type": "CityRegion",
            "value": "Rideau"
        },
        {
            "type": "CityRegion",
            "value": "Ridgetown"
        },
        {
            "type": "CityRegion",
            "value": "Ridgeway"
        },
        {
            "type": "CityRegion",
            "value": "River"
        },
        {
            "type": "CityRegion",
            "value": "River Oaks"
        },
        {
            "type": "CityRegion",
            "value": "Riverdale"
        },
        {
            "type": "CityRegion",
            "value": "Rockcliffe-Smythe"
        },
        {
            "type": "CityRegion",
            "value": "Rockwood"
        },
        {
            "type": "CityRegion",
            "value": "Rodney"
        },
        {
            "type": "CityRegion",
            "value": "Rolling Acres"
        },
        {
            "type": "CityRegion",
            "value": "Rolling Meadows"
        },
        {
            "type": "CityRegion",
            "value": "Rolston"
        },
        {
            "type": "CityRegion",
            "value": "Roncesvalles"
        },
        {
            "type": "CityRegion",
            "value": "Rose"
        },
        {
            "type": "CityRegion",
            "value": "Rosebank"
        },
        {
            "type": "CityRegion",
            "value": "Rosedale"
        },
        {
            "type": "CityRegion",
            "value": "Rosedale-Moore Park"
        },
        {
            "type": "CityRegion",
            "value": "Roseland"
        },
        {
            "type": "CityRegion",
            "value": "Rosemont"
        },
        {
            "type": "CityRegion",
            "value": "Rouge E10"
        },
        {
            "type": "CityRegion",
            "value": "Rouge E11"
        },
        {
            "type": "CityRegion",
            "value": "Rouge Fairways"
        },
        {
            "type": "CityRegion",
            "value": "Rouge Park"
        },
        {
            "type": "CityRegion",
            "value": "Rouge River Estates"
        },
        {
            "type": "CityRegion",
            "value": "Rouge Woods"
        },
        {
            "type": "CityRegion",
            "value": "Rougemount"
        },
        {
            "type": "CityRegion",
            "value": "Royal Orchard"
        },
        {
            "type": "CityRegion",
            "value": "Runnymede-Bloor West Village"
        },
        {
            "type": "CityRegion",
            "value": "Rural"
        },
        {
            "type": "CityRegion",
            "value": "Rural Adelaide Metcalfe"
        },
        {
            "type": "CityRegion",
            "value": "Rural Adjala-Tosorontio"
        },
        {
            "type": "CityRegion",
            "value": "Rural Alnwick/Haldimand"
        },
        {
            "type": "CityRegion",
            "value": "Rural Amaranth"
        },
        {
            "type": "CityRegion",
            "value": "Rural Ancaster"
        },
        {
            "type": "CityRegion",
            "value": "Rural Asphodel-Norwood"
        },
        {
            "type": "CityRegion",
            "value": "Rural Aurora"
        },
        {
            "type": "CityRegion",
            "value": "Rural Barrie Southeast"
        },
        {
            "type": "CityRegion",
            "value": "Rural Barrie Southwest"
        },
        {
            "type": "CityRegion",
            "value": "Rural Bayham"
        },
        {
            "type": "CityRegion",
            "value": "Rural Bexley"
        },
        {
            "type": "CityRegion",
            "value": "Rural Blue Mountains"
        },
        {
            "type": "CityRegion",
            "value": "Rural Bradford West Gwillimbury"
        },
        {
            "type": "CityRegion",
            "value": "Rural Brighton"
        },
        {
            "type": "CityRegion",
            "value": "Rural Brock"
        },
        {
            "type": "CityRegion",
            "value": "Rural Burlington"
        },
        {
            "type": "CityRegion",
            "value": "Rural Caledon"
        },
        {
            "type": "CityRegion",
            "value": "Rural Carden"
        },
        {
            "type": "CityRegion",
            "value": "Rural Cavan Monaghan"
        },
        {
            "type": "CityRegion",
            "value": "Rural Central Elgin"
        },
        {
            "type": "CityRegion",
            "value": "Rural Centre Wellington"
        },
        {
            "type": "CityRegion",
            "value": "Rural Charlotteville"
        },
        {
            "type": "CityRegion",
            "value": "Rural Chatham"
        },
        {
            "type": "CityRegion",
            "value": "Rural Chatsworth"
        },
        {
            "type": "CityRegion",
            "value": "Rural Clarington"
        },
        {
            "type": "CityRegion",
            "value": "Rural Clearview"
        },
        {
            "type": "CityRegion",
            "value": "Rural Cramahe"
        },
        {
            "type": "CityRegion",
            "value": "Rural Dalton"
        },
        {
            "type": "CityRegion",
            "value": "Rural Douro-Dummer"
        },
        {
            "type": "CityRegion",
            "value": "Rural Dundas"
        },
        {
            "type": "CityRegion",
            "value": "Rural Dutton/Dunwich"
        },
        {
            "type": "CityRegion",
            "value": "Rural East Garafraxa"
        },
        {
            "type": "CityRegion",
            "value": "Rural East Gwillimbury"
        },
        {
            "type": "CityRegion",
            "value": "Rural East Luther Grand Valley"
        },
        {
            "type": "CityRegion",
            "value": "Rural Eldon"
        },
        {
            "type": "CityRegion",
            "value": "Rural Emily"
        },
        {
            "type": "CityRegion",
            "value": "Rural Erin"
        },
        {
            "type": "CityRegion",
            "value": "Rural Essa"
        },
        {
            "type": "CityRegion",
            "value": "Rural Fenelon"
        },
        {
            "type": "CityRegion",
            "value": "Rural Flamborough"
        },
        {
            "type": "CityRegion",
            "value": "Rural Fourth"
        },
        {
            "type": "CityRegion",
            "value": "Rural Galway-Cavendish and Harvey"
        },
        {
            "type": "CityRegion",
            "value": "Rural Georgian Bluffs"
        },
        {
            "type": "CityRegion",
            "value": "Rural Glanbrook"
        },
        {
            "type": "CityRegion",
            "value": "Rural Grey Highlands"
        },
        {
            "type": "CityRegion",
            "value": "Rural Guelph/Eramosa"
        },
        {
            "type": "CityRegion",
            "value": "Rural Halton Hills"
        },
        {
            "type": "CityRegion",
            "value": "Rural Hamilton Township"
        },
        {
            "type": "CityRegion",
            "value": "Rural Havelock-Belmont-Methuen"
        },
        {
            "type": "CityRegion",
            "value": "Rural Innisfil"
        },
        {
            "type": "CityRegion",
            "value": "Rural King"
        },
        {
            "type": "CityRegion",
            "value": "Rural Laxton"
        },
        {
            "type": "CityRegion",
            "value": "Rural Malahide"
        },
        {
            "type": "CityRegion",
            "value": "Rural Manvers"
        },
        {
            "type": "CityRegion",
            "value": "Rural Mapleton"
        },
        {
            "type": "CityRegion",
            "value": "Rural Mariposa"
        },
        {
            "type": "CityRegion",
            "value": "Rural Markham"
        },
        {
            "type": "CityRegion",
            "value": "Rural Meaford"
        },
        {
            "type": "CityRegion",
            "value": "Rural Melancthon"
        },
        {
            "type": "CityRegion",
            "value": "Rural Middlesex Centre"
        },
        {
            "type": "CityRegion",
            "value": "Rural Middleton"
        },
        {
            "type": "CityRegion",
            "value": "Rural Minto"
        },
        {
            "type": "CityRegion",
            "value": "Rural Mono"
        },
        {
            "type": "CityRegion",
            "value": "Rural Mulmur"
        },
        {
            "type": "CityRegion",
            "value": "Rural New Tecumseth"
        },
        {
            "type": "CityRegion",
            "value": "Rural North Kawartha"
        },
        {
            "type": "CityRegion",
            "value": "Rural Norwich"
        },
        {
            "type": "CityRegion",
            "value": "Rural Oakville"
        },
        {
            "type": "CityRegion",
            "value": "Rural Ops"
        },
        {
            "type": "CityRegion",
            "value": "Rural Orford"
        },
        {
            "type": "CityRegion",
            "value": "Rural Oro-Medonte"
        },
        {
            "type": "CityRegion",
            "value": "Rural Oshawa"
        },
        {
            "type": "CityRegion",
            "value": "Rural Otonabee-South Monaghan"
        },
        {
            "type": "CityRegion",
            "value": "Rural Pickering"
        },
        {
            "type": "CityRegion",
            "value": "Rural Port Hope"
        },
        {
            "type": "CityRegion",
            "value": "Rural Puslinch"
        },
        {
            "type": "CityRegion",
            "value": "Rural Ramara"
        },
        {
            "type": "CityRegion",
            "value": "Rural Richmond Hill"
        },
        {
            "type": "CityRegion",
            "value": "Rural Scugog"
        },
        {
            "type": "CityRegion",
            "value": "Rural Severn"
        },
        {
            "type": "CityRegion",
            "value": "Rural Smith-Ennismore-Lakefield"
        },
        {
            "type": "CityRegion",
            "value": "Rural Somerville"
        },
        {
            "type": "CityRegion",
            "value": "Rural South-West Oxford"
        },
        {
            "type": "CityRegion",
            "value": "Rural Southgate"
        },
        {
            "type": "CityRegion",
            "value": "Rural Southwest Middlesex"
        },
        {
            "type": "CityRegion",
            "value": "Rural Springwater"
        },
        {
            "type": "CityRegion",
            "value": "Rural Stoney Creek"
        },
        {
            "type": "CityRegion",
            "value": "Rural Strathroy Caradoc"
        },
        {
            "type": "CityRegion",
            "value": "Rural Tay"
        },
        {
            "type": "CityRegion",
            "value": "Rural Thames Centre"
        },
        {
            "type": "CityRegion",
            "value": "Rural Tiny"
        },
        {
            "type": "CityRegion",
            "value": "Rural Trent Hills"
        },
        {
            "type": "CityRegion",
            "value": "Rural Uxbridge"
        },
        {
            "type": "CityRegion",
            "value": "Rural Vaughan"
        },
        {
            "type": "CityRegion",
            "value": "Rural Verulam"
        },
        {
            "type": "CityRegion",
            "value": "Rural Wellington North"
        },
        {
            "type": "CityRegion",
            "value": "Rural West Elgin"
        },
        {
            "type": "CityRegion",
            "value": "Rural West Grey"
        },
        {
            "type": "CityRegion",
            "value": "Rural Whitby"
        },
        {
            "type": "CityRegion",
            "value": "Rural Whitchurch-Stouffville"
        },
        {
            "type": "CityRegion",
            "value": "Rural Windham"
        },
        {
            "type": "CityRegion",
            "value": "Rural Woodhouse"
        },
        {
            "type": "CityRegion",
            "value": "Rushdale"
        },
        {
            "type": "CityRegion",
            "value": "Rustic"
        },
        {
            "type": "CityRegion",
            "value": "Ryckmans"
        },
        {
            "type": "CityRegion",
            "value": "Rykert/Vansickle"
        },
        {
            "type": "CityRegion",
            "value": "Rymal"
        },
        {
            "type": "CityRegion",
            "value": "SE"
        },
        {
            "type": "CityRegion",
            "value": "SW"
        },
        {
            "type": "CityRegion",
            "value": "Saltford"
        },
        {
            "type": "CityRegion",
            "value": "Samac"
        },
        {
            "type": "CityRegion",
            "value": "Sandringham-Wellington"
        },
        {
            "type": "CityRegion",
            "value": "Sandringham-Wellington North"
        },
        {
            "type": "CityRegion",
            "value": "Sandy Hollow"
        },
        {
            "type": "CityRegion",
            "value": "Sanford"
        },
        {
            "type": "CityRegion",
            "value": "Sarnia"
        },
        {
            "type": "CityRegion",
            "value": "Saugeen Shores"
        },
        {
            "type": "CityRegion",
            "value": "Scarborough Village"
        },
        {
            "type": "CityRegion",
            "value": "Schomberg"
        },
        {
            "type": "CityRegion",
            "value": "Scott"
        },
        {
            "type": "CityRegion",
            "value": "Secord Woods"
        },
        {
            "type": "CityRegion",
            "value": "Shanty Bay"
        },
        {
            "type": "CityRegion",
            "value": "Sharon"
        },
        {
            "type": "CityRegion",
            "value": "Shedden"
        },
        {
            "type": "CityRegion",
            "value": "Shelburne"
        },
        {
            "type": "CityRegion",
            "value": "Sheldon"
        },
        {
            "type": "CityRegion",
            "value": "Sheridan"
        },
        {
            "type": "CityRegion",
            "value": "Sheridan Park"
        },
        {
            "type": "CityRegion",
            "value": "Sherkston"
        },
        {
            "type": "CityRegion",
            "value": "Sherwood"
        },
        {
            "type": "CityRegion",
            "value": "Sherwood-Amberglen"
        },
        {
            "type": "CityRegion",
            "value": "Shoreacres"
        },
        {
            "type": "CityRegion",
            "value": "Shrewsbury"
        },
        {
            "type": "CityRegion",
            "value": "Simcoe"
        },
        {
            "type": "CityRegion",
            "value": "Singhampton"
        },
        {
            "type": "CityRegion",
            "value": "Smithville"
        },
        {
            "type": "CityRegion",
            "value": "Snake Island"
        },
        {
            "type": "CityRegion",
            "value": "Snelgrove"
        },
        {
            "type": "CityRegion",
            "value": "Snow Valley"
        },
        {
            "type": "CityRegion",
            "value": "Sonoma Heights"
        },
        {
            "type": "CityRegion",
            "value": "Sophiasburgh"
        },
        {
            "type": "CityRegion",
            "value": "South A"
        },
        {
            "type": "CityRegion",
            "value": "South AA"
        },
        {
            "type": "CityRegion",
            "value": "South B"
        },
        {
            "type": "CityRegion",
            "value": "South BB"
        },
        {
            "type": "CityRegion",
            "value": "South Bruce"
        },
        {
            "type": "CityRegion",
            "value": "South Bruce Peninsula"
        },
        {
            "type": "CityRegion",
            "value": "South C"
        },
        {
            "type": "CityRegion",
            "value": "South D"
        },
        {
            "type": "CityRegion",
            "value": "South Dumfries"
        },
        {
            "type": "CityRegion",
            "value": "South E"
        },
        {
            "type": "CityRegion",
            "value": "South East"
        },
        {
            "type": "CityRegion",
            "value": "South F"
        },
        {
            "type": "CityRegion",
            "value": "South G"
        },
        {
            "type": "CityRegion",
            "value": "South GG"
        },
        {
            "type": "CityRegion",
            "value": "South H"
        },
        {
            "type": "CityRegion",
            "value": "South HH"
        },
        {
            "type": "CityRegion",
            "value": "South I"
        },
        {
            "type": "CityRegion",
            "value": "South J"
        },
        {
            "type": "CityRegion",
            "value": "South K"
        },
        {
            "type": "CityRegion",
            "value": "South L"
        },
        {
            "type": "CityRegion",
            "value": "South M"
        },
        {
            "type": "CityRegion",
            "value": "South MM"
        },
        {
            "type": "CityRegion",
            "value": "South Marysburgh"
        },
        {
            "type": "CityRegion",
            "value": "South N"
        },
        {
            "type": "CityRegion",
            "value": "South O"
        },
        {
            "type": "CityRegion",
            "value": "South P"
        },
        {
            "type": "CityRegion",
            "value": "South Parkdale"
        },
        {
            "type": "CityRegion",
            "value": "South Q"
        },
        {
            "type": "CityRegion",
            "value": "South R"
        },
        {
            "type": "CityRegion",
            "value": "South Richvale"
        },
        {
            "type": "CityRegion",
            "value": "South Riverdale"
        },
        {
            "type": "CityRegion",
            "value": "South S"
        },
        {
            "type": "CityRegion",
            "value": "South Shore"
        },
        {
            "type": "CityRegion",
            "value": "South T"
        },
        {
            "type": "CityRegion",
            "value": "South U"
        },
        {
            "type": "CityRegion",
            "value": "South V"
        },
        {
            "type": "CityRegion",
            "value": "South W"
        },
        {
            "type": "CityRegion",
            "value": "South West"
        },
        {
            "type": "CityRegion",
            "value": "South X"
        },
        {
            "type": "CityRegion",
            "value": "South Y"
        },
        {
            "type": "CityRegion",
            "value": "South Z"
        },
        {
            "type": "CityRegion",
            "value": "South ZZ"
        },
        {
            "type": "CityRegion",
            "value": "South of Taylor-Kidd Blvd"
        },
        {
            "type": "CityRegion",
            "value": "Southam"
        },
        {
            "type": "CityRegion",
            "value": "Southdown"
        },
        {
            "type": "CityRegion",
            "value": "Southgate"
        },
        {
            "type": "CityRegion",
            "value": "Southwold Town"
        },
        {
            "type": "CityRegion",
            "value": "Sparta"
        },
        {
            "type": "CityRegion",
            "value": "Springfield"
        },
        {
            "type": "CityRegion",
            "value": "St. Andrew-Windfields"
        },
        {
            "type": "CityRegion",
            "value": "St. Clair"
        },
        {
            "type": "CityRegion",
            "value": "St. Davids"
        },
        {
            "type": "CityRegion",
            "value": "St. Joseph"
        },
        {
            "type": "CityRegion",
            "value": "St. Williams"
        },
        {
            "type": "CityRegion",
            "value": "Stamford"
        },
        {
            "type": "CityRegion",
            "value": "Stayner"
        },
        {
            "type": "CityRegion",
            "value": "Steeles"
        },
        {
            "type": "CityRegion",
            "value": "Steeles Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Steeles West Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Stephen Twp"
        },
        {
            "type": "CityRegion",
            "value": "Stevenson"
        },
        {
            "type": "CityRegion",
            "value": "Stevensville"
        },
        {
            "type": "CityRegion",
            "value": "Stewarttown"
        },
        {
            "type": "CityRegion",
            "value": "Stinson"
        },
        {
            "type": "CityRegion",
            "value": "Stipley"
        },
        {
            "type": "CityRegion",
            "value": "Stone Mills"
        },
        {
            "type": "CityRegion",
            "value": "Stonegate-Queensway"
        },
        {
            "type": "CityRegion",
            "value": "Stonehaven-Wyndham"
        },
        {
            "type": "CityRegion",
            "value": "Stoney Creek"
        },
        {
            "type": "CityRegion",
            "value": "Stoney Creek Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Stoney Creek Mountain"
        },
        {
            "type": "CityRegion",
            "value": "Stouffville"
        },
        {
            "type": "CityRegion",
            "value": "Straffordville"
        },
        {
            "type": "CityRegion",
            "value": "Strathcona"
        },
        {
            "type": "CityRegion",
            "value": "Streetsville"
        },
        {
            "type": "CityRegion",
            "value": "Stroud"
        },
        {
            "type": "CityRegion",
            "value": "Sudbury"
        },
        {
            "type": "CityRegion",
            "value": "Sugarbush"
        },
        {
            "type": "CityRegion",
            "value": "Sugarloaf"
        },
        {
            "type": "CityRegion",
            "value": "Summerhill Estates"
        },
        {
            "type": "CityRegion",
            "value": "Sunderland"
        },
        {
            "type": "CityRegion",
            "value": "Sunnidale"
        },
        {
            "type": "CityRegion",
            "value": "Sunninghill"
        },
        {
            "type": "CityRegion",
            "value": "Sutton & Jackson's Point"
        },
        {
            "type": "CityRegion",
            "value": "Talbotville"
        },
        {
            "type": "CityRegion",
            "value": "Tam O'Shanter-Sullivan"
        },
        {
            "type": "CityRegion",
            "value": "Tansley"
        },
        {
            "type": "CityRegion",
            "value": "Taunton"
        },
        {
            "type": "CityRegion",
            "value": "Taunton North"
        },
        {
            "type": "CityRegion",
            "value": "Tecumseh"
        },
        {
            "type": "CityRegion",
            "value": "Teeterville"
        },
        {
            "type": "CityRegion",
            "value": "Templemead"
        },
        {
            "type": "CityRegion",
            "value": "Thamesford"
        },
        {
            "type": "CityRegion",
            "value": "Thamesville"
        },
        {
            "type": "CityRegion",
            "value": "The Beaches"
        },
        {
            "type": "CityRegion",
            "value": "The Islands"
        },
        {
            "type": "CityRegion",
            "value": "Thedford"
        },
        {
            "type": "CityRegion",
            "value": "Thistletown-Beaumonde Heights"
        },
        {
            "type": "CityRegion",
            "value": "Thornbury"
        },
        {
            "type": "CityRegion",
            "value": "Thorncliffe Park"
        },
        {
            "type": "CityRegion",
            "value": "Thorndale"
        },
        {
            "type": "CityRegion",
            "value": "Thorner"
        },
        {
            "type": "CityRegion",
            "value": "Thornhill"
        },
        {
            "type": "CityRegion",
            "value": "Thornlea"
        },
        {
            "type": "CityRegion",
            "value": "Thornton"
        },
        {
            "type": "CityRegion",
            "value": "Thorold Downtown"
        },
        {
            "type": "CityRegion",
            "value": "Tilbury"
        },
        {
            "type": "CityRegion",
            "value": "Tilbury East"
        },
        {
            "type": "CityRegion",
            "value": "Tillsonburg"
        },
        {
            "type": "CityRegion",
            "value": "Timberlea"
        },
        {
            "type": "CityRegion",
            "value": "Toronto Gore Rural Estate"
        },
        {
            "type": "CityRegion",
            "value": "Tottenham"
        },
        {
            "type": "CityRegion",
            "value": "Town"
        },
        {
            "type": "CityRegion",
            "value": "Town Centre"
        },
        {
            "type": "CityRegion",
            "value": "Townsend"
        },
        {
            "type": "CityRegion",
            "value": "Trafalgar"
        },
        {
            "type": "CityRegion",
            "value": "Trenholme"
        },
        {
            "type": "CityRegion",
            "value": "Trinity-Bellwoods"
        },
        {
            "type": "CityRegion",
            "value": "Turkey Point"
        },
        {
            "type": "CityRegion",
            "value": "Twenty Place"
        },
        {
            "type": "CityRegion",
            "value": "Two Rivers"
        },
        {
            "type": "CityRegion",
            "value": "Tyandaga"
        },
        {
            "type": "CityRegion",
            "value": "Union"
        },
        {
            "type": "CityRegion",
            "value": "Unionville"
        },
        {
            "type": "CityRegion",
            "value": "University"
        },
        {
            "type": "CityRegion",
            "value": "Uplands"
        },
        {
            "type": "CityRegion",
            "value": "Uptown"
        },
        {
            "type": "CityRegion",
            "value": "Uptown Core"
        },
        {
            "type": "CityRegion",
            "value": "Uxbridge"
        },
        {
            "type": "CityRegion",
            "value": "Vales of Castlemore"
        },
        {
            "type": "CityRegion",
            "value": "Vales of Castlemore North"
        },
        {
            "type": "CityRegion",
            "value": "Valley East"
        },
        {
            "type": "CityRegion",
            "value": "Vanessa"
        },
        {
            "type": "CityRegion",
            "value": "Vanier"
        },
        {
            "type": "CityRegion",
            "value": "Varna"
        },
        {
            "type": "CityRegion",
            "value": "Vaughan Corporate Centre"
        },
        {
            "type": "CityRegion",
            "value": "Vaughan Grove"
        },
        {
            "type": "CityRegion",
            "value": "Vellore Village"
        },
        {
            "type": "CityRegion",
            "value": "Victoria Harbour"
        },
        {
            "type": "CityRegion",
            "value": "Victoria Manor-Jennings Gate"
        },
        {
            "type": "CityRegion",
            "value": "Victoria Square"
        },
        {
            "type": "CityRegion",
            "value": "Victoria Village"
        },
        {
            "type": "CityRegion",
            "value": "Vienna"
        },
        {
            "type": "CityRegion",
            "value": "Villa Nova"
        },
        {
            "type": "CityRegion",
            "value": "Village"
        },
        {
            "type": "CityRegion",
            "value": "Village East"
        },
        {
            "type": "CityRegion",
            "value": "Village Green-South Unionville"
        },
        {
            "type": "CityRegion",
            "value": "Villages of Glancaster"
        },
        {
            "type": "CityRegion",
            "value": "Vincent"
        },
        {
            "type": "CityRegion",
            "value": "Vinegar Hill"
        },
        {
            "type": "CityRegion",
            "value": "Virgil"
        },
        {
            "type": "CityRegion",
            "value": "Virginia"
        },
        {
            "type": "CityRegion",
            "value": "Vittoria"
        },
        {
            "type": "CityRegion",
            "value": "Walker"
        },
        {
            "type": "CityRegion",
            "value": "Wallaceburg"
        },
        {
            "type": "CityRegion",
            "value": "Wallacetown"
        },
        {
            "type": "CityRegion",
            "value": "Walsh"
        },
        {
            "type": "CityRegion",
            "value": "Walsingham"
        },
        {
            "type": "CityRegion",
            "value": "Walton"
        },
        {
            "type": "CityRegion",
            "value": "Wardsville"
        },
        {
            "type": "CityRegion",
            "value": "Warkworth"
        },
        {
            "type": "CityRegion",
            "value": "Warminister"
        },
        {
            "type": "CityRegion",
            "value": "Wasaga Beach"
        },
        {
            "type": "CityRegion",
            "value": "Washago"
        },
        {
            "type": "CityRegion",
            "value": "Waterdown"
        },
        {
            "type": "CityRegion",
            "value": "Waterford"
        },
        {
            "type": "CityRegion",
            "value": "Waterfront Communities C1"
        },
        {
            "type": "CityRegion",
            "value": "Waterfront Communities C8"
        },
        {
            "type": "CityRegion",
            "value": "Watford"
        },
        {
            "type": "CityRegion",
            "value": "Watson"
        },
        {
            "type": "CityRegion",
            "value": "Waubaushene"
        },
        {
            "type": "CityRegion",
            "value": "Waverley"
        },
        {
            "type": "CityRegion",
            "value": "Welland Downtown"
        },
        {
            "type": "CityRegion",
            "value": "Wellington"
        },
        {
            "type": "CityRegion",
            "value": "West"
        },
        {
            "type": "CityRegion",
            "value": "West Bayfield"
        },
        {
            "type": "CityRegion",
            "value": "West Carleton"
        },
        {
            "type": "CityRegion",
            "value": "West Hill"
        },
        {
            "type": "CityRegion",
            "value": "West Humber-Clairville"
        },
        {
            "type": "CityRegion",
            "value": "West Lincoln"
        },
        {
            "type": "CityRegion",
            "value": "West Lorne"
        },
        {
            "type": "CityRegion",
            "value": "West Oak Trails"
        },
        {
            "type": "CityRegion",
            "value": "West Shore"
        },
        {
            "type": "CityRegion",
            "value": "West Welland"
        },
        {
            "type": "CityRegion",
            "value": "West Willow Woods"
        },
        {
            "type": "CityRegion",
            "value": "West Woodbridge"
        },
        {
            "type": "CityRegion",
            "value": "West Woodbridge Industrial Area"
        },
        {
            "type": "CityRegion",
            "value": "West of Sir John A. Blvd"
        },
        {
            "type": "CityRegion",
            "value": "Westbrook"
        },
        {
            "type": "CityRegion",
            "value": "Westcliffe"
        },
        {
            "type": "CityRegion",
            "value": "Westdale"
        },
        {
            "type": "CityRegion",
            "value": "Western Business Park"
        },
        {
            "type": "CityRegion",
            "value": "Western Hill"
        },
        {
            "type": "CityRegion",
            "value": "Westgate"
        },
        {
            "type": "CityRegion",
            "value": "Westminster-Branson"
        },
        {
            "type": "CityRegion",
            "value": "Weston"
        },
        {
            "type": "CityRegion",
            "value": "Weston-Pellam Park"
        },
        {
            "type": "CityRegion",
            "value": "Wexford-Maryvale"
        },
        {
            "type": "CityRegion",
            "value": "Wheatley"
        },
        {
            "type": "CityRegion",
            "value": "Whitby Industrial"
        },
        {
            "type": "CityRegion",
            "value": "Williamsburg"
        },
        {
            "type": "CityRegion",
            "value": "Willmott"
        },
        {
            "type": "CityRegion",
            "value": "Willowdale East"
        },
        {
            "type": "CityRegion",
            "value": "Willowdale West"
        },
        {
            "type": "CityRegion",
            "value": "Willowridge-Martingrove-Richview"
        },
        {
            "type": "CityRegion",
            "value": "Wilsonville"
        },
        {
            "type": "CityRegion",
            "value": "Windfields"
        },
        {
            "type": "CityRegion",
            "value": "Windham Centre"
        },
        {
            "type": "CityRegion",
            "value": "Windsor"
        },
        {
            "type": "CityRegion",
            "value": "Wingham"
        },
        {
            "type": "CityRegion",
            "value": "Winona"
        },
        {
            "type": "CityRegion",
            "value": "Winona Park"
        },
        {
            "type": "CityRegion",
            "value": "Winston Park"
        },
        {
            "type": "CityRegion",
            "value": "Wismer"
        },
        {
            "type": "CityRegion",
            "value": "Woburn"
        },
        {
            "type": "CityRegion",
            "value": "Woodbine Corridor"
        },
        {
            "type": "CityRegion",
            "value": "Woodbine-Lumsden"
        },
        {
            "type": "CityRegion",
            "value": "Woodland Hill"
        },
        {
            "type": "CityRegion",
            "value": "Woodlands"
        },
        {
            "type": "CityRegion",
            "value": "Woodville"
        },
        {
            "type": "CityRegion",
            "value": "Wychwood"
        },
        {
            "type": "CityRegion",
            "value": "Wyebridge"
        },
        {
            "type": "CityRegion",
            "value": "Wyevale"
        },
        {
            "type": "CityRegion",
            "value": "Yeoville"
        },
        {
            "type": "CityRegion",
            "value": "Yonge-Eglinton"
        },
        {
            "type": "CityRegion",
            "value": "Yonge-St. Clair"
        },
        {
            "type": "CityRegion",
            "value": "York University Heights"
        },
        {
            "type": "CityRegion",
            "value": "Yorkdale-Glen Park"
        },
        {
            "type": "CityRegion",
            "value": "Zurich"
        },
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
        },
        {
            "type": "CountyOrParish",
            "value": "Algoma"
        },
        {
            "type": "CountyOrParish",
            "value": "Brant"
        },
        {
            "type": "CountyOrParish",
            "value": "Brantford"
        },
        {
            "type": "CountyOrParish",
            "value": "Bruce"
        },
        {
            "type": "CountyOrParish",
            "value": "Canada"
        },
        {
            "type": "CountyOrParish",
            "value": "Chatham-Kent"
        },
        {
            "type": "CountyOrParish",
            "value": "Cochrane"
        },
        {
            "type": "CountyOrParish",
            "value": "Dufferin"
        },
        {
            "type": "CountyOrParish",
            "value": "Durham"
        },
        {
            "type": "CountyOrParish",
            "value": "Elgin"
        },
        {
            "type": "CountyOrParish",
            "value": "Essex"
        },
        {
            "type": "CountyOrParish",
            "value": "Frontenac"
        },
        {
            "type": "CountyOrParish",
            "value": "Greater Sudbury"
        },
        {
            "type": "CountyOrParish",
            "value": "Grey County"
        },
        {
            "type": "CountyOrParish",
            "value": "Haldimand"
        },
        {
            "type": "CountyOrParish",
            "value": "Haliburton"
        },
        {
            "type": "CountyOrParish",
            "value": "Halton"
        },
        {
            "type": "CountyOrParish",
            "value": "Hamilton"
        },
        {
            "type": "CountyOrParish",
            "value": "Hastings"
        },
        {
            "type": "CountyOrParish",
            "value": "Huron"
        },
        {
            "type": "CountyOrParish",
            "value": "Kawartha Lakes"
        },
        {
            "type": "CountyOrParish",
            "value": "Kenora"
        },
        {
            "type": "CountyOrParish",
            "value": "Lambton"
        },
        {
            "type": "CountyOrParish",
            "value": "Lanark"
        },
        {
            "type": "CountyOrParish",
            "value": "Leeds & Grenville"
        },
        {
            "type": "CountyOrParish",
            "value": "Lennox & Addington"
        },
        {
            "type": "CountyOrParish",
            "value": "Manitoulin"
        },
        {
            "type": "CountyOrParish",
            "value": "Middlesex"
        },
        {
            "type": "CountyOrParish",
            "value": "Muskoka"
        },
        {
            "type": "CountyOrParish",
            "value": "Niagara"
        },
        {
            "type": "CountyOrParish",
            "value": "Nipissing"
        },
        {
            "type": "CountyOrParish",
            "value": "Norfolk"
        },
        {
            "type": "CountyOrParish",
            "value": "Northumberland"
        },
        {
            "type": "CountyOrParish",
            "value": "Other Country"
        },
        {
            "type": "CountyOrParish",
            "value": "Ottawa"
        },
        {
            "type": "CountyOrParish",
            "value": "Oxford"
        },
        {
            "type": "CountyOrParish",
            "value": "Parry Sound"
        },
        {
            "type": "CountyOrParish",
            "value": "Peel"
        },
        {
            "type": "CountyOrParish",
            "value": "Perth"
        },
        {
            "type": "CountyOrParish",
            "value": "Peterborough"
        },
        {
            "type": "CountyOrParish",
            "value": "Pontiac"
        },
        {
            "type": "CountyOrParish",
            "value": "Prescott and Russell"
        },
        {
            "type": "CountyOrParish",
            "value": "Prince Edward"
        },
        {
            "type": "CountyOrParish",
            "value": "Prince Edward County"
        },
        {
            "type": "CountyOrParish",
            "value": "Rainy River"
        },
        {
            "type": "CountyOrParish",
            "value": "Renfrew"
        },
        {
            "type": "CountyOrParish",
            "value": "Simcoe"
        },
        {
            "type": "CountyOrParish",
            "value": "Stormont, Dundas and Glengarry"
        },
        {
            "type": "CountyOrParish",
            "value": "Sudbury"
        },
        {
            "type": "CountyOrParish",
            "value": "Thunder Bay"
        },
        {
            "type": "CountyOrParish",
            "value": "Timiskaming"
        },
        {
            "type": "CountyOrParish",
            "value": "Toronto"
        },
        {
            "type": "CountyOrParish",
            "value": "USA"
        },
        {
            "type": "CountyOrParish",
            "value": "Waterloo"
        },
        {
            "type": "CountyOrParish",
            "value": "Wellington"
        },
        {
            "type": "CountyOrParish",
            "value": "York"
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

    // Generate display text for a location
    const getLocationDisplay = (location) => {
        if (location.type === "CityRegion") {
            return `${location.value} (Region)`;
        }
        return location.value;
    };

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
                    placeholder="Start typing a city or neighbourhood..."
                    className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                />
                <button
                    onClick={handleSearchClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 button-homer-search transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
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

export default CitySearch;