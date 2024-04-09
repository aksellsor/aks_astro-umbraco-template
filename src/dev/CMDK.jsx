import { useEffect, useRef, useState } from 'react';

import "./CMDK.css";

// External components
import { FixedSizeList as List } from "react-window";

const UMBRACO = import.meta.env.PUBLIC_UMBRACO_URL;
const openUrl = (url) => {
    window
        .open(
            url,
            "_blank"
        )
        .focus();
};
const goToUmbraco = (id) => {
    openUrl(`${UMBRACO}#/content/content/edit/${id}`);
};
const UmbIcon = ({ color = "currentColor", size = "1em" }) => {
    return (<svg stroke={color} width={size} height={size} fill={color} strokeWidth="0" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 11.982A12 12 0 1 1 12 24 12 12 0 0 1 0 11.982zm11.756 4.11a11.856 11.856 0 0 1-2.773-.25 2.12 2.12 0 0 1-1.514-1.218q-.41-.943-.396-2.895a18.419 18.419 0 0 1 .127-2.04q.118-.988.236-1.629l.082-.425a.201.201 0 0 0 0-.038.244.244 0 0 0-.201-.236l-1.544-.246H5.74a.243.243 0 0 0-.235.189 6.517 6.517 0 0 0-.089.409c-.088.455-.17.9-.26 1.548a19.99 19.99 0 0 0-.176 2.12 11.165 11.165 0 0 0 0 1.486q.05 1.977.675 3.155.626 1.179 2.106 1.695 1.482.517 4.135.506h.22q2.655.01 4.134-.506 1.478-.518 2.1-1.695.623-1.178.678-3.147a11.165 11.165 0 0 0 0-1.485 19.99 19.99 0 0 0-.176-2.121 30.014 30.014 0 0 0-.26-1.548 6.724 6.724 0 0 0-.088-.41.243.243 0 0 0-.236-.188h-.04l-1.548.242a.236.236 0 0 0-.203.236.201.201 0 0 0 0 .037l.081.426q.118.643.236 1.63a18.709 18.709 0 0 1 .126 2.039q.019 1.95-.396 2.892a2.12 2.12 0 0 1-1.502 1.22 11.82 11.82 0 0 1-2.769.247Z"></path></svg>);
};

const DocumentIcon = ({ color = "currentColor", size = "1em" }) => {
    return (<svg stroke={color} width={size} height={size} fill={color} strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path></svg>);
};

const HomeIcon = ({ color = "currentColor", size = "1em" }) => {
    return (<svg stroke={color} width={size} height={size} fill={color} strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>);
};
const Row = ({ index, style, data }) => {
    const { items, currentItemIndex, updateIndex } = data;
    let item = items[index];
    let path = item.route.path;
    return (
        <div style={style}>
            <div
                data-id={item.id}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateIndex(index + 1);
                    window.location = path;
                }}
                className={`cmdk-item
                ${currentItemIndex === index + 1 ? "cmdk-item--selected" : ""}
                ${window.location.pathname === path ? "current" : ""}`}
            >
                <span style={{ opacity: 0.5 }}>⏎</span>
                <div>{(path === "/" || path === "/en") ? <HomeIcon /> : <DocumentIcon />}</div>
                <div className='cmdk-item__label'>{item.name}</div>
                <div style={{ display: "flex", marginLeft: "auto", gap: ".5rem", alignItems: "center" }}>

                    <span style={{ opacity: 0.5 }} className='umb-btn-arrow'>
                        →
                    </span>
                    <div className='umb-btn'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            goToUmbraco(item.id);
                        }}>
                        <UmbIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};
const CMDK = ({ routes, currentId }) => {
    // let currentId = routes?.find(r => r.route.path === window.location.pathname);
    const [open, setOpen] = useState(false);

    const rows = useRef(null);
    useEffect(() => {
        if (rows.current) {
            setHeight(rows.current.clientHeight);
        }
    }, []); //empty dependency array so it only runs once at render

    const [filtered, setFiltered] = useState(routes);
    const [search, setSearch] = useState(null);
    useEffect(() => {
        if (search?.length > 0 && routes?.length > 0) {
            let f = routes?.filter(r => r.name.toLowerCase().includes(search));
            setFiltered(f);
        }
        if (!search?.length > 0) {
            setFiltered(routes);
        }
    }, [search, routes]);

    const dialogRef = useRef();
    useEffect(() => {
        const dialog = dialogRef.current;
        const onClick = (event) => {
            if (event.target === dialog) {
                setOpen(false);
            }
        };
        const keyDown = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }

            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(true);
            }
        };
        dialog.addEventListener("click", onClick);
        window.addEventListener("keydown", keyDown);
        return () => {
            dialog.removeEventListener("click", onClick);
            window.removeEventListener("keydown", keyDown);
        };
    }, [dialogRef]);


    const inputRef = useRef();
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);



    const listRef = useRef();
    const [currentItemIndex, setCurrentItemIndex] = useState(0);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (open) {
                if (event.key === "Enter") {
                    let selected = document.querySelector(`.cmdk-item--selected`);
                    selected.click();
                }
                if (event.key === "ArrowRight") {
                    let selected = document.querySelector(`.cmdk-item--selected`);
                    let dataId = selected?.getAttribute("data-id");

                    if (dataId) {
                        goToUmbraco(dataId);
                    }
                }
                if (event.key === "ArrowDown") {
                    setCurrentItemIndex((prevIndex) => {
                        let newIndex = prevIndex + 1;
                        if (newIndex > filtered?.length) return 0;
                        else return newIndex;
                    });
                } else if (event.key === "ArrowUp") {
                    setCurrentItemIndex((prevIndex) => prevIndex - 1 < 0 ? 0 : prevIndex - 1);
                }
            }
        };
        if (open) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, filtered]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToItem(currentItemIndex, "auto");
            // "auto" | "smart" | "center" | "end" | "start"
        }
    }, [currentItemIndex]);

    useEffect(() => {
        setCurrentItemIndex(0);
    }, [open]);
    useEffect(() => {
        if (!search?.length > 0) {
            setCurrentItemIndex(0);
        }
    }, [search]);

    return (
        <>

            <div
                ref={dialogRef}
                className={`cmdk-dialog ${open ? "cmdk-dialog--open" : ""}`}
            >
                <div className='cmdk-box'>

                    <input
                        ref={inputRef}
                        className='cmdk-input'
                        placeholder='Søk'
                        onInput={e => {
                            setSearch(e.target.value?.toLowerCase());
                        }}
                    />

                    {filtered?.length === 0 ? <span style={{ opacity: 0.5 }}><center>No results found.</center></span> :
                        <div
                            className={`cmdk-item--first cmdk-item ${currentItemIndex === 0 ? "cmdk-item--selected" : ""}`}
                            onClick={(e) => {
                                alert(currentId);
                                // goToUmbraco(currentId);
                            }}
                        >
                            {/* <span style={{ opacity: 0.5 }}>⏎</span> */}
                            <UmbIcon color="#3644a7" />
                            <div className='cmdk-item__label'>Rediger denne siden i Umbraco</div>

                            <span style={{ opacity: 0.5, marginLeft: "auto" }}>⏎</span>
                            {/* <div style={{ marginLeft: "auto", opacity: 0.5 }}><small>ALT+SHIFT+U</small></div> */}
                        </div>
                    }
                    <List
                        itemCount={filtered?.length}
                        itemSize={35}
                        itemData={{ items: filtered, currentItemIndex, updateIndex: setCurrentItemIndex }}
                        ref={listRef}
                        // height={293}
                        height={(filtered?.length + 1) * 35 < 393 ? (filtered?.length + 1) * 35 : 393}
                        width="100%"
                    >
                        {Row}
                    </List>
                </div>
            </div >
        </>
    );
};

export default CMDK;