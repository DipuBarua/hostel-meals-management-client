
const MealCart = ({ item }) => {
    return (
        <div>
            <div className="card glass">
                <figure><img src={item.image} alt="meal" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.price}</p>
                    <p className=" text-orange-500">{item.rating}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Learn now!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCart;