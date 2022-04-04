// Create actions here to be performed

import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

//post/add comment
export const postComment = (dishId, rating, author, comment) => (dispatch)=> {
    
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        alert('Your comment could not be posted ' , error.message)
    });

}


//Dishes actions
export const fetchDishes = () => (dispatch)=> {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});


//Comments actions
export const fetchComments = () => (dispatch)=> {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});



//Propmotions actions
export const fetchPromos = () => (dispatch)=> {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promos')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});




// Removed during server communication

// export const fetchDishes = () => (dispatch)=> {
//     dispatch(dishesLoading(true));

//     setTimeout( ()=>{
//         dispatch(addDishes(DISHES));
//     }, 2000);
// };

// export const dishesLoading = () => ({
//     type: ActionTypes.DISHES_LOADING,
// });

// export const addDishes = (dishes) => ({
//     type: ActionTypes.ADD_DISHES,
//     payload: dishes
// });

// export const dishesFailed = (errmess) => ({
//     type: ActionTypes.DISHES_FAILED,
//     payload: errmess
// });
