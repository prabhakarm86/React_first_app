import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
        Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderMenuItem ({ dish, onClick}) {
        return (
            <Card>
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="80%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle heading>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-3" key={dish.id} >
                    <RenderMenuItem dish={ dish } />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Menu</h3>
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }


export default Menu;




// Using class components

// class Menu extends Component {

//     constructor(props) {
//         super(props);

//     }

//     render() {
//         const menu = this.props.dishes.map((dish) => {
//             return (
//               <div key={dish.id} className="col-12 col-md-5 m-3">
//                 <Card onClick={() => this.props.onClick(dish.id)}>
//                     <CardImg width="80%" src={dish.image} alt={dish.name} />
//                     <CardImgOverlay>
//                         <CardTitle heading>{dish.name}</CardTitle>
//                     </CardImgOverlay>
//                 </Card>
//               </div>
//             );
//         });

//         console.log("Menu Components render is invoked")

//         return (
//           <div className="container">
//             <div className="row">
//                 {menu}
//             </div>
//             {/* <div className="row">
//                 <div  className="col-12 col-md-5 m-1">
//                     {this.renderDish(this.state.selectedDish)}
//                 </div>
//             </div> */}
//           </div>
//         );
//     }
// }