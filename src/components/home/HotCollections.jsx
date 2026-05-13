import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'keen-slider/keen-slider.min.css';
import {useKeenSlider} from 'keen-slider/react';

const HotCollections = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 3,
    },
    slideChanged() {
      console.log('slide changed')
    },
  }) 

  const [collections, setCollections] = useState([]);
  
  useEffect(() => {
    async function fetchCollections() {
      try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(data);
      }
      catch (error) {
        console.error("Error fetching collections:", error);
      }
    }
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" style={{ position: 'relative'}}>
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div ref={sliderRef} className="keen-slider">
          {collections.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                <Link to={`/author/${item.authorId}`}>
                    <img className="lazy pp-coll" src={item.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC-{item.code}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
