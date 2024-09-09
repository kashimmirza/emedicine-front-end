/** @format */

import React from "react";
import "../styles/MedicineCard.css";

function MedicineCard({ medicine }) {
    const discountedPrice = (
        medicine.price *
        (1 - medicine.discount / 100)
    ).toFixed(2);

    return ( <
        div className = "medicine-card" >
        <
        div className = "discount-tag" > { medicine.discount } % off < /div> <
        img src = { medicine.image }
        alt = { medicine.name }
        className = "medicine-image" /
        >
        <
        div className = "medicine-info" >
        <
        h3 className = "medicine-name" > { medicine.name } - { medicine.dosage } <
        /h3> <
        p className = "medicine-ingredient" > { medicine.ingredient } < /p> <
        p className = "medicine-company" > { medicine.company } < /p> <
        div className = "medicine-price" >
        <
        span className = "old-price" > Tk { medicine.price.toFixed(2) } < /span> <
        span className = "new-price" > Tk { discountedPrice } < /span> < /
        div > <
        button className = "add-to-cart" > Add to Cart < /button> < /
        div > <
        /div>
    );
}

export default MedicineCard;