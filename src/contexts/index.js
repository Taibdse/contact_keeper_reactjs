import React from 'react';
import { ContactProvider } from './ContactContext';

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight((kids, parent) => (
        React.cloneElement(parent, {
            children: kids
        })
    ), children)
}

const GlobalContext = (props) => {
    const contexts = [ <ContactProvider/> ];
    return (
        <ProviderComposer contexts={contexts}>
            { props.children }
        </ProviderComposer>
    )
} 

export default GlobalContext;
