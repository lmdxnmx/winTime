import React, { useState } from 'react';
import { IconArrowDown } from "@consta/icons/IconArrowDown"
import { IconArrowUp } from "@consta/icons/IconArrowUp"
function ExpandableText({ title, bodyText }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='expandableContainer'>
            <div onClick={toggleExpanded} style={{ cursor: 'pointer', borderBottom: "1px solid #00416633", textAlign: "left",display:'flex',alignItems:'center' }}>
                {isExpanded ? <IconArrowUp/>: <IconArrowDown/>}
                <h3 style={{fontSize:18,fontWeight:400,color:"#002033"}}>{title}</h3>
            </div>
            {isExpanded && <p style={{textAlign:'left',fontSize:18,fontWeight:400,color:"#000"}}>{bodyText}</p>}
        </div>
    );
}

export default ExpandableText;