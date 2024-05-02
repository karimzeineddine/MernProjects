const CityList =({cities})=>{
    return(
        <div>
            <h3>list of cities</h3>
            <ul>
                {cities.map((city,index)=>(
                    <li key={index}>{city}</li>
                ))}
            </ul>
        </div>
    );
};

export default CityList;