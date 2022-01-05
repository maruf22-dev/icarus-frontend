import Head from 'next/head';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import styles from '../styles/map.module.css'
import ReactSlider from 'react-slider'
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = "pk.eyJ1IjoiZGV2LWljYXJ1cyIsImEiOiJja3htOTd4YnAwYjBpMm9wN2V1dXN0enBxIn0.imngKPcStcncOKT9-kD3WA";
const Map = () => {

    const notify = (message) => toast.dark(
        message,
        {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
        }
    );

    // const BACKEND_URL = 'http://localhost:3001';
    // const SQL_DB_INFO = 'LOCAL';
    let BACKEND_URL;
    let SQL_DB_INFO;
    BACKEND_URL = 'https://icarus-backend.herokuapp.com'
    SQL_DB_INFO = 'WEB';

    const blocks = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const sizeLimit =
    {
        start: 1000,
        end: 10000,
    }
    const rentLimit =
    {
        start: 1000,
        end: 100000,
    }
    const bedroomLimit =
    {
        start: 1,
        end: 10,
    }
    const bathroomLimit =
    {
        start: 1,
        end: 10,
    }

    const [viewPort, setViewPort] = useState({
        zoom: 14,
        minZoom: 14,
        latitude: 23.8135,
        longitude: 90.4303,
        height: "100%",
        width: "100%",
    })
    const ROOM_TYPE =
    {
        SINGLE: 'Single',
        SHARED: 'Shared',
        ANY: 'Any'
    }
    const GENDER_TYPE =
    {
        MALE: 'Male',
        FEMALE: 'Female',
        ANY: 'Any'
    }
    const RESTRICTION_TYPE =
    {
        YES: 'Yes',
        NO: 'No'
    }

    const router = useRouter();


    const [blocksDropDownPressed, setBlocksDropDownPressed] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState("A");
    const [currentRent, setCurrentRent] = useState(rentLimit.end);
    const [currentSize, setCurrentSize] = useState(sizeLimit.end);
    const [currentBedroom, setCurrentBedroom] = useState(bedroomLimit.end);
    const [currentBathroom, setCurrentBathroom] = useState(bathroomLimit.end);
    const [gender, setGender] = useState(GENDER_TYPE.FEMALE);
    const [restriction, setRestriction] = useState(RESTRICTION_TYPE.NO);
    const [roomtype, setRoomtype] = useState(ROOM_TYPE.SINGLE);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [selectedListing, setSelectedListing] = useState(null);
    const [latitude, setLatitude] = useState(23.81);
    const [longitude, setLongitude] = useState(90.43);

    // changes state based on search input bar change
    let handleSearch = (event) => {
        let keyword = event?.target?.value;
        setSearchKeyWord(keyword);
    }
    async function addListing() {
        let id = uuid();
        let area = await axios.post(
            `${BACKEND_URL}/api/v1/database/insertarea?HOST=${SQL_DB_INFO}`, {
            areaID: id,
            latitude: latitude,
            longitude: longitude,
        }
        );
        let listing = await axios.post(
            `${BACKEND_URL}/api/v1/database/insertlistings?HOST=${SQL_DB_INFO}`, {
            listID: id,
            listedBy: '',
            size: currentSize,
            rent: currentRent,
            beds: currentBedroom,
            baths: currentBathroom,
            aptNo: '',
            house: '',
            road: '',
            block: selectedBlock,
            location: 'Bashundhara R/A',
            latitude: latitude,
            longitude: longitude,
            vacancy: 1,
            listingArea: id,
        }
        );

    }
    return (
        <>
            <MapBox
                latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude}
                viewPort={viewPort} setViewPort={setViewPort}
                selectedListing={selectedListing} setSelectedListing={setSelectedListing}
            />
            <div className={styles.settings}>
                <div className={styles.page_title}>
                    <div className={styles.home_icon}>
                        <img alt="" src={"../home_icon.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                    <div className={styles.page_title_container}>
                        Add
                    </div>
                    <div className={styles.home_icon}>
                        <img alt="" src={"../lisitings_icon.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                </div>
                {/* <div className={styles.search}>
                    <div className={styles.search_bar}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={styles.searchbar}
                            onChange={(e) => { handleSearch(e) }} />
                    </div>
                    <div className={styles.search_button}>
                        <img alt="" src={"../cross_icon.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                </div> */}

                <div className={styles.blocks_bar}>
                    <div className={styles.block_text}>Block</div>
                    <div className={styles.block_dropdown} onClick={() => setBlocksDropDownPressed(!blocksDropDownPressed)}>{selectedBlock}</div>
                </div>
                {
                    blocksDropDownPressed && <div className={styles.dropdown_list}>
                        {
                            blocks.map((current, index) =>
                                <div className={styles.block_list}
                                    key={index}
                                    onClick={() => {
                                        setSelectedBlock(current);
                                        setBlocksDropDownPressed(!blocksDropDownPressed);
                                    }}
                                >{current}</div>)
                        }
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.price_slider}>
                        <div className={styles.rent_price}>
                            Size : {currentSize} sqft
                        </div>
                        <ReactSlider
                            min={sizeLimit.start}
                            max={sizeLimit.end}
                            value={currentSize}
                            onChange={(value) => { setCurrentSize(value) }}
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                        // renderThumb={(props, state) => <div className={styles.thumb_div} {...props{currentRent}}></div>}
                        />
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.price_slider}>
                        <div className={styles.rent_price}>
                            Rent: {currentRent}
                        </div>
                        <ReactSlider
                            min={rentLimit.start}
                            max={rentLimit.end}
                            value={currentRent}
                            onChange={(value) => { setCurrentRent(value) }}
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                        // renderThumb={(props, state) => <div className={styles.thumb_div} {...props{currentRent}}></div>}
                        />
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.price_slider}>
                        <div className={styles.rent_price}>
                            Bedroom : {currentBedroom}
                        </div>
                        <ReactSlider
                            min={bedroomLimit.start}
                            max={bedroomLimit.end}
                            value={currentBedroom}
                            onChange={(value) => { setCurrentBedroom(value) }}
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                        />
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.price_slider}>
                        <div className={styles.rent_price}>
                            Attached Bathroom : {currentBathroom}
                        </div>
                        <ReactSlider
                            min={bathroomLimit.start}
                            max={bathroomLimit.end}
                            value={currentBathroom}
                            onChange={(value) => { setCurrentBathroom(value) }}
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                        />
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.pressbox}>
                        <div className={styles.pressbox_name}>
                            Room Type :
                        </div>
                        <div className={styles.pressbox_button} onClick={() => {
                            if (roomtype === ROOM_TYPE.SHARED) setRoomtype(ROOM_TYPE.SINGLE);
                            else if (roomtype == ROOM_TYPE.SINGLE) setRoomtype(ROOM_TYPE.ANY);
                            else setRoomtype(ROOM_TYPE.SHARED);
                        }}>
                            {roomtype}
                        </div>
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.pressbox}>
                        <div className={styles.pressbox_name}>
                            Gender :
                        </div>
                        <div className={styles.pressbox_button} onClick={() => {
                            if (gender === GENDER_TYPE.MALE) setGender(GENDER_TYPE.FEMALE);
                            else if (gender === GENDER_TYPE.FEMALE) setGender(GENDER_TYPE.ANY)
                            else setGender(GENDER_TYPE.MALE);

                        }}>
                            {gender}
                        </div>
                    </div>
                }
                {
                    !blocksDropDownPressed &&
                    <div className={styles.pressbox}>
                        <div className={styles.pressbox_name}>
                            Restricted :
                        </div>
                        <div className={styles.pressbox_button} onClick={() => {
                            if (restriction === RESTRICTION_TYPE.YES) setRestriction(RESTRICTION_TYPE.NO);
                            else setRestriction(RESTRICTION_TYPE.YES)

                        }}>
                            {restriction}
                        </div>
                    </div>
                }
                <div className={styles.addListingButton}>
                    <img alt="" src={"../add.png"} onClick={async () => {
                        notify('Listing Added Successfully!');
                        await addListing();
                    }} />
                </div>
                <div className={styles.phone_navigator}>
                    <div className={styles.phone_nav_icon}>
                        <img alt="" src={"../nav_maps.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                    <div className={styles.phone_nav_icon}>
                        <img alt="" src={"../home_icon.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                    <div className={styles.phone_nav_icon}>
                        <img alt="" src={"../cross_icon.png"} onClick={() => { router.push("/dashboard") }} />
                    </div>
                </div>

            </div>
            <ToastContainer>

            </ToastContainer>
        </>
    )
}

const MapBox = ({ viewPort, setViewPort, selectedListing, setSelectedListing, latitude, longitude, setLatitude, setLongitude }) => {
    React.useEffect(() => {
        function handleResize() {
            setViewPort({
                ...viewPort,
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })


    const [settings, setsettings] = useState({
        dragpan: false,
        // scrollZoom: false,
        keyboard: false,
    });




    const mapStyle = "mapbox://styles/dev-icarus/ckxnarrj65qbd15ugbg9xwhgn";

    function inBounds(latitude, longitude) {
        const bounds =
        {
            ul:
            {
                latitude: 23.826,
                longitude: 90.421,
            },
            dr:
            {
                latitude: 23.7999,
                longitude: 90.4435,
            }

        }
        let latitudeInBound = (bounds.ul.latitude > latitude) && (bounds.dr.latitude < latitude);
        let longitudeInBound = (bounds.ul.longitude < longitude) && (bounds.dr.longitude > longitude);
        return latitudeInBound && longitudeInBound;
    }

    return (
        <div className={styles.map}>
            <ReactMapGL {...viewPort}
                {...settings}
                mapStyle={mapStyle}
                mapboxApiAccessToken={API_KEY}
                onViewportChange={(viewPort) => {
                    if (inBounds(viewPort.latitude, viewPort.longitude)) setViewPort(viewPort);
                }}>

                <div>
                    <Marker latitude={latitude} longitude={longitude} draggable={true} onDrag={(event) => {
                        console.log(event);
                        setLatitude(event.lngLat[1]);
                        setLongitude(event.lngLat[0]);
                    }}>
                        <div className={styles.list_image}>
                            <img alt="" src={"../map_point.png"}
                            />
                        </div>
                    </Marker>
                </div>
                {
                    selectedListing && (
                        <Popup latitude={selectedListing.latitude} longitude={selectedListing.longitude}
                            closeButton={false}
                            closeOnClick={true}
                            onClose={() => {
                                setSelectedListing(null);
                            }} popup_list_single

                        >
                            <div className={styles.popup}>
                                {
                                    selectedListing.listings.map((list, index) =>
                                        <div key={list.id} className={styles.popup_list}>
                                            <div className={styles.popup_list_single}>
                                                Listing {index + 1}
                                            </div>
                                            <div className={styles.popup_list_single}>
                                                Address: {list.address}
                                            </div>
                                            <div className={styles.popup_list_single}>
                                                Rent: {list.rent}
                                            </div>
                                            <div className={styles.popup_list_single}>
                                                Rooms: {list.numOfBeds} bed and {list.numOfBaths}
                                            </div>
                                            <div className={styles.popup_list_single}>
                                                Gender: {list.gender}

                                            </div>
                                            <div className={styles.popup_list_single}>
                                                <div className={styles.popup_list_image}>
                                                    <img alt="" src={"../go_forward_icon.png"} onClick={() => { }} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </Popup>
                    )
                }

            </ReactMapGL>

            <div>
                ami
                tui
            </div>

        </div >

    )
}

export default Map
