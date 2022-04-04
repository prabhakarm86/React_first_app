import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos, postComment } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	}
}

//Action method defination
const mapDispatchToProps = dispatch => ({
    // addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
	fetchDishes: () => {dispatch(fetchDishes())},
	fetchComments: () => {dispatch(fetchComments())},
	fetchPromos: () => {dispatch(fetchPromos())},
	resetFeedbackForm: () =>{dispatch(actions.reset('feedback'))},
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
  });

class Main extends Component {

	constructor (props) {
		super(props);
	}

	componentDidMount () {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
	}

	render() {

		const HomePage = () =>{
			return (
				<Home dish={this.props.dishes.dishes.filter((dish) => dish.label === 'New')[0]}
					dishesLoading={this.props.dishes.isLoading}
					dishesErrMess={this.props.dishes.errMess}

					// promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
					promosLoading={this.props.promotions.isLoading}
					promosErrMess={this.props.promotions.errMess}
					
					leader={this.props.leaders.filter((lead) => lead.featured)[0]}
				/>
				
			);
		}

		const DishWithId = ({match}) => {
			return (
				<DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
						isLoading={this.props.dishes.isLoading}
						errMess={this.props.dishes.errMess}
						
						comments={this.props.comments.comments.filter((comment) => comment.dishId ===parseInt(match.params.dishId,10))}
						postComment={this.props.postComment}
						commentsErrMess={this.props.comments.errMess}

				/>
			);
		}
	
    	return (
    		<div>
				<Header />
				<TransitionGroup>
					<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
					<Switch>
						<Route exact path="/home" component={HomePage} />
						<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
						<Route path="/menu/:dishId" component={DishWithId} />
						<Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
						<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
						<Redirect to="/home" />
					</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
  		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));






// Removed part

	// onDishSeclect(dishId) {
    //     this.setState({ selectedDish: dishId});
    // }

// render() {
// 	return (
// 		<div>
// 			<Header />
// 			<Menu 
// 				dishes = { this.state.dishes } onClick={(dishId) => this.onDishSeclect(dishId)} />
// 			<DishDetail	
// 				dish={ this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
// 			<DishDetail
// 				comment={ this.state.comments } />
// 			<Footer />
// 		</div>
// 	  );
// }