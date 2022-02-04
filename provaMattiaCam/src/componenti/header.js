function Header(){


    return(
        <div className="header">
            <div className="title d-flex flex-column align-items-center mt-5">
                <h1><strong>    
                    <span className="text-danger">M</span>
                    <span className="text-warning">A</span>
                    <span className="text-primary">T</span>
                    <span className="text-light">T</span>
                    <span className="text-success">I</span>
                    <span className="text-danger">A</span>
                    <span className="text-light"> - </span>
                    <span className="text-primary">C</span>
                    <span className="text-warning">A</span>
                    <span className="text-success">M</span>
                </strong></h1>
                <h6 className="text-light"><i>CVE, what does ai see?</i></h6>
                <hr/>
            </div>
        </div>
    )
}

export default Header;