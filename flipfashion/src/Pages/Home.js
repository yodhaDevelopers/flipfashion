import React, { useState } from "react";
import Product from "./Product";
import SnackbarHandler from "./Components/SnackbarHandler";

function Home() {


    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleAddToBasket = () => {
        setSnackbarState({
            open: true,
            message: "Item Successfully added to cart",
            severity: "success",
        });
        setTimeout(() => {
            setSnackbarState(prevState => ({
                ...prevState,
                open: false,
            }));
        }, 2000);
    }


    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbarState,
            open: false,
        });
    };

    return (
        <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
            <SnackbarHandler
                open={snackbarState.open}
                message={snackbarState.message}
                severity={snackbarState.severity}
                handleClose={handleSnackbarClose}
            />
            <section style={{ height: "450px" }} className="banner h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden cursor-pointer">
                <img style={{ marginTop: "70px", height: "400px", width: "1920px" }} draggable="false" className="h-44 sm:h-72 w-full object-cover" src="assets/banner.png" alt="FlipFashion Banner" />
            </section>
            <section className="bg-white w-full shadow overflow-hidden">

                <div className="flex px-6 py-4 justify-around items-center">
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="1"
                            title="Men Striped Round Neck Cotton Blend Black, White T-Shirt"
                            price={329}
                            rating={5}
                            image="https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/e/k/5/m-ask-006-ausk-original-imagqajgfnmzbztg.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="2"
                            title="Men Regular Mid Rise Light Blue Jeans"
                            price={429}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/612/612/xif0q/jean/l/7/q/34-jeans-metronaut-original-imags5ab2xhbbx9y.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>


                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="3"
                            title="Black Embroidered Bollywood Chiffon Saree"
                            price={799}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/612/612/kshtxu80/shopsy-sari/s/g/3/free-1077-red-dhnik-creation-unstitched-original-imag6fnksfymhcza.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                </div>
                <div className="flex px-6 py-4 justify-around items-center">
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="4"
                            title="Women A-line Maroon, White Dress"
                            price={419}
                            rating={5}
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPMXh34qWocqmTZ6I4OdoKij6L4KPjO626p5DQQsuX1k-By9X"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="5"
                            title="White Georgette Stitched Flared Gown"
                            price={829}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/612/612/xif0q/gown/1/c/m/na-5xl-full-sleeve-stitched-pal-1296-miss-clothing-na-original-imagqbxgggj98vzu.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="6"
                            title="Olive Green Men's Cargos"
                            price={1020}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/612/612/kvy58y80/trouser/r/1/z/32-hltr004631-highlander-original-imag8qrnzmxyhjgt.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                </div>
                <div className="flex px-6 py-4 justify-around items-center">
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="7"
                            title="Men Solid Round Neck Cotton Blend Black T-Shirt"
                            price={305}
                            rating={5}
                            image="https://rukminim2.flixcart.com/image/612/612/kr58yvk0/t-shirt/c/n/k/m-r-hf-451-black-london-hills-original-imag4ztguqrkfsec.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="8"
                            title="Men Solid Polo Neck Pure Cotton Grey T-Shirt"
                            price={599}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/832/832/k16qzrk0/t-shirt/k/q/u/xxl-askporgfa96575-allen-solly-original-imafksp33ghgnajm.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="9"
                            title="Embroidered Women Pink Top"
                            price={305}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/832/832/l02r1jk0/top/y/v/a/xs-top0001-khyati-kurties-original-imagbxyrzqtrgpwr.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                </div>
                <div className="flex px-6 py-4 justify-around items-center">
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="10"
                            title="Beach Wear Shoulder Straps Solid Women Black Top"
                            price={299}
                            rating={5}
                            image="https://rukminim2.flixcart.com/image/832/832/kkh6zrk0/top/j/0/5/m-zm107-black-zamaisha-original-imafztbqsaayhp2x.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="11"
                            title="Women Fit and Flare Black"
                            price={499}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/dress/m/e/c/s-sleeveless-round-neck-knee-length-cotton-western-dress-suyash-original-imagq8p29bhqmdq6.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="12"
                            title="Men Regular Fit Solid Black Casual Shirt"
                            price={387}
                            rating={3}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/j/o/t/m-black-formal-shirt-m-atlanta-impex-original-imagghhfcvmbpgct.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                </div>
                <div className="flex px-6 py-4 justify-around items-center">
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="13"
                            title="Men Slim Fit Black Lycra Blend Trousers"
                            price={299}
                            rating={3}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/c/k/i/36-black-trouser-bb-c-borda-brother-s-original-imagqq8ydtjx8mgr.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="14"
                            title="Sneakers For Men  (White)"
                            price={399}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/z/w/b/6-la7458-6-layasa-white-original-imaghk9hwxbzejdw.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="15"
                            title="Men Regular Fit Blue Striped Casual Shirt"
                            price={349}
                            rating={3}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/r/k/k/44-shirt-1-guptas-fashion-original-imagh9dzeteyvyah.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                </div>
                <div className="flex px-6 py-4 justify-around items-center">
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="16"
                            title="Solid Men Black Sports Shorts"
                            price={305}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/short/l/2/p/l-premium-fabric-sport-short-yazole-original-imaggwuutwfjy4sg.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="17"
                            title="Women Striped High Neck Polyester Green T-Shirt"
                            price={499}
                            rating={4}
                            image="https://rukminim2.flixcart.com/image/832/832/kirr24w0-0/top/i/b/u/l-tp-319-g-s-keydus-original-imafyhafghpuh8mw.jpeg?q=70"
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                    <div className="title flex flex-col gap-0.5">
                        <Product
                            id="12"
                            title="Men Solid Round Neck Cotton Blend White T-Shirt"
                            price={295}
                            rating={3}
                            image="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/h/s/1/xl-rz01ovsolidwhite-diversify-original-imagqaggymxz5ct5.jpeg?q=70   "
                            onAddToBasket={handleAddToBasket}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;