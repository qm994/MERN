import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

// export const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return (
//         isLoading
//         ? 
//         <SpinnerOverlay>
//             <SpinnerContainer />
//         </SpinnerOverlay>
//         :
//         <WrappedComponent {...otherProps} />
//     )
// }

export const WithSpinner = (loading) => {
    return (
        loading && 
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    )
};