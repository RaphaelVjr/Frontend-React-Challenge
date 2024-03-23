import * as React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { Input } from "@progress/kendo-react-inputs";
import '@progress/kendo-theme-default/dist/all.css';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from "@progress/kendo-react-buttons";
import {
    CreatedDateCell,
    ColumnMenu,
    UpdateddDateCell,
} from "../components/Movies/CustomCells";
import {
    Grid,
    GridColumn as Column,

    GridToolbar,
} from "@progress/kendo-react-grid";
import {
    setGroupIds,
    setExpandedState,
} from "@progress/kendo-react-data-tools";
import "../components/Movies/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from "../components/Movies/FileUpload/FileUpload";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const DATA_ITEM_KEY = "id";
const SELECTED_FIELD = "selected";
const initialDataState = {
    take: 10,
    skip: 0,
    group: [],
};
const processWithGroups = (data, dataState) => {
    const newDataState = process(data, dataState);
    setGroupIds({
        data: newDataState.data,
        group: dataState.group,
    });
    return newDataState;
};
const MoviesGrid = () => {
    const idGetter = getter(DATA_ITEM_KEY);
    const [filterValue, setFilterValue] = React.useState();
    const [topMovies, setTopMovies] = React.useState([])
    const [filteredData, setFilteredData] = React.useState(topMovies);
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [currentSelectedState, setCurrentSelectedState] = React.useState({});
    const [dataState, setDataState] = React.useState(initialDataState);
    const [dataResult, setDataResult] = React.useState(
        process(filteredData, dataState)
    );

    const moviesUrl = 'https://api.themoviedb.org/3/movie/';
    const ApiKey = 'api_key=370c9e0ff0179afc2b5f12a30b202de9';
    const getTopRatedMovies = async (moviesUrl) => {
        try {
            const res = await fetch(moviesUrl);
            const data = await res.json();

            const movies = await Promise.all(data.results.map(async (movie) => {
                const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?${ApiKey}`);
                const creditsData = await creditsRes.json();
                const director = creditsData.crew.find(person => person.job === 'Director');

                const movieData = {
                    id: movie.id,
                    title: movie.original_title,
                    director: director ? director.name : 'Unknown',
                    average_score: movie.vote_average,
                    updated_at: formatDate(new Date()),
                    created_at: movie.release_date,
                };

                function formatDate(date) {
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}`;
                }

                return movieData;
            }));

            return movies;
        } catch (error) {
            toast.error("API tmdb error");
        }
    };

    const getMoviesFromDatabase = async () => {
        try {
            const res = await fetch('http://127.0.0.1:3000/movies', {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                toast.error('Network response was not ok');
            }

            const data = await res.json();
            return data;
        } catch (error) {
            toast.error("API offline");
            return [];
        }
    };


    const handleFileUpload = () => {
        setTimeout(() => {
            getMoviesFromDatabase().then(movies => {
                setTopMovies(movies);
                setFilteredData(movies);
                setFileUploaded(true);
            });
        }, 6000); 
    };


    React.useEffect(() => {

        getMoviesFromDatabase().then(movies => {
            setTopMovies(movies);
            setFilteredData(movies);


            const topRatedUrl = `${moviesUrl}top_rated?${ApiKey}`;
            getTopRatedMovies(topRatedUrl).then(topRatedMovies => {
                const newMovies = topRatedMovies.filter(topRatedMovie =>
                    !movies.some(movie => movie.title === topRatedMovie.title)
                );
                setTopMovies(prevMovies => [...prevMovies, ...newMovies]);
                setFilteredData(prevData => [...prevData, ...newMovies]);
            });
        });

        if (fileUploaded) { // Only call handleFileUpload if a file has been uploaded
            handleFileUpload();
        }
    }, [fileUploaded]);

    const onFilterChange = (ev) => {
        let value = ev.value;
        setFilterValue(ev.value);
        let newData = topMovies.filter((item) => {
            let match = false;
            for (const property in item) {
                if (
                    item[property]
                        .toString()
                        .toLocaleLowerCase()
                        .indexOf(value.toLocaleLowerCase()) >= 0
                ) {
                    match = true;
                }
                if (
                    item[property].toLocaleDateString &&
                    item[property].toLocaleDateString().indexOf(value) >= 0
                ) {
                    match = true;
                }
            }
            return match;
        });
        setFilteredData(newData);
        let clearedPagerDataState = {
            ...dataState,
            take: 8,
            skip: 0,
        };
        let processedData = process(newData, clearedPagerDataState);
        processedData.data = processedData.data.map((item) => ({
            ...item,
            selected: currentSelectedState[item[DATA_ITEM_KEY]],
        }));
        setDataResult(processedData);
        setDataState(clearedPagerDataState);

    };
    const [resultState] = React.useState(
        processWithGroups(
            topMovies.map((item) => ({
                ...item,
                ["selected"]: currentSelectedState[idGetter(item)],
            })),
            initialDataState
        )
    );
    const dataStateChange = (event) => {
        let processedData = process(filteredData, event.dataState);
        processedData.data = processedData.data.map((item) => ({
            ...item,
            selected: currentSelectedState[item[DATA_ITEM_KEY]],
        }));
        setDataResult(processedData);
        setDataState(event.dataState);
    };

    React.useEffect(() => {
        dataStateChange({ dataState });
    }, [filteredData, dataState]);


    const onExpandChange = React.useCallback(
        (event) => {
            const newData = [...dataResult.data];
            const item = event.dataItem;
            if (item.groupId) {
                const targetGroup = newData.find((d) => d.groupId === item.groupId);
                if (targetGroup) {
                    targetGroup.expanded = event.value;
                    setDataResult({
                        ...dataResult,
                        data: newData,
                    });
                }
            } else {
                item.expanded = event.value;
                setDataResult({
                    ...dataResult,
                    data: newData,
                });
            }
        },
        [dataResult]
    );
    const setSelectedValue = (data) => {
        let newData = data.map((item) => {
            if (item.items) {
                return {
                    ...item,
                    items: setSelectedValue(item.items),
                };
            } else {
                return {
                    ...item,
                    ["selected"]: currentSelectedState[idGetter(item)],
                };
            }
        });
        return newData;
    };
    const newData = setExpandedState({
        data: setSelectedValue(resultState.data),
        collapsedIds: [],
    });

    const [selectAll, setSelectAll] = React.useState(false);

    const onHeaderSelectionChange = React.useCallback(
        (event) => {
            const checked = !selectAll;
            setSelectAll(checked);
            const newSelectedState = {};
            topMovies.forEach((item) => {
                newSelectedState[idGetter(item)] = checked;
            });
            setCurrentSelectedState(newSelectedState);
            const newData = topMovies.map((item) => ({
                ...item,
                [SELECTED_FIELD]: checked,
            }));
            const newDataResult = processWithGroups(newData, dataState);
            setDataResult(newDataResult);
        },
        [selectAll, topMovies, idGetter, dataState]
    );

    const onSelectionChange = (event) => {
        const selectedProductId = event.dataItem.id;
        const newSelectedState = {
            ...currentSelectedState,
            [selectedProductId]: !currentSelectedState[selectedProductId],
        };
        setCurrentSelectedState(newSelectedState);
        const newData = topMovies.map((item) => {
            return {
                ...item,
                selected: newSelectedState[idGetter(item)],
            };
        });
        const newDataResult = processWithGroups(newData, dataState);
        setDataResult(newDataResult);
    };

    const getNumberOfItems = (topMovies) => {
        let count = 0;
        topMovies.forEach((item) => {
            if (item.items) {
                count = count + getNumberOfItems(item.items);
            } else {
                count++;
            }
        });
        return count;
    };


    const getNumberOfSelectedItems = (topMovies) => {
        let count = 0;
        topMovies.forEach((item) => {
            if (item.items) {
                count = count + getNumberOfSelectedItems(item.items);
            } else {
                count = count + (item.selected == true ? 1 : 0);
            }
        });
        return count;
    };
    const checkHeaderSelectionValue = () => {
        let selectedItems = getNumberOfSelectedItems(newData);
        return newData.length > 0 && selectedItems == getNumberOfItems(newData);
    };
    let _pdfExport;
    const exportExcel = () => {
        _export.save();
    };
    let _export;
    const exportPDF = () => {
        _pdfExport.save();
    };
    return (
        <div>
            <ToastContainer />
            <ExcelExport
                data={topMovies}
                ref={(exporter) => {
                    _export = exporter;
                }}
            >
                <Grid
                    style={{
                        height: "500px",
                    }}
                    pageable={{
                        pageSizes: true,
                    }}
                    data={dataResult}
                    sortable={true}
                    total={resultState.total}
                    onDataStateChange={dataStateChange}
                    {...dataState}
                    onExpandChange={onExpandChange}
                    expandField="expanded"
                    dataItemKey={DATA_ITEM_KEY}
                    selectedField={SELECTED_FIELD}
                    onHeaderSelectionChange={onHeaderSelectionChange}
                    onSelectionChange={onSelectionChange}
                    groupable={true}
                    size={"small"}
                >
                    <GridToolbar>

                        <Input
                            value={filterValue}
                            onChange={onFilterChange}
                            style={{
                                border: "2px solid #ccc",
                                boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
                                width: "170px",
                                height: "30px",
                                marginRight: "10px",
                            }}
                            placeholder="Search in all columns..."
                        />
                        <FileUpload topMovies={topMovies} setFilteredData={setFilteredData} setTopMovies={setTopMovies} />
                        <div className="export-btns-container">
                            <Button onClick={exportExcel}>Export to Excel</Button>
                            <Button onClick={exportPDF}>Export to PDF</Button>
                        </div>
                    </GridToolbar>
                    <Column
                        filterable={false}
                        field={SELECTED_FIELD}
                        width={50}
                        headerSelectionValue={checkHeaderSelectionValue()}
                    />

                    <Column title="Movie">
                        <Column
                            field="title"
                            title="Title"
                            columnMenu={ColumnMenu}
                            width="250px"
                        />
                        <Column
                            field="director"
                            title="Director"
                            columnMenu={ColumnMenu}
                            width="220px"
                        />
                    </Column>
                    <Column title="Info">
                        <Column
                            field="average_score"
                            title="Average Score"
                            cell={(props) => (
                                <td>
                                    IMDB: {typeof props.dataItem[props.field] === 'number' ? props.dataItem[props.field].toFixed(1) : props.dataItem[props.field]} <FontAwesomeIcon icon={faStar} color="orange" />
                                </td>
                            )}
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                        <Column
                            field="created_at"
                            title="Released At"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: CreatedDateCell,
                            }}
                            width="230px"
                        />
                        <Column
                            field="updated_at"
                            title="Updated at"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: UpdateddDateCell,
                            }}
                            width="250px"
                        />
                    </Column>
                </Grid>
            </ExcelExport>
            <GridPDFExport
                ref={(element) => {
                    _pdfExport = element;
                }}
                margin="1cm"
            >
                <Grid
                    style={{
                        height: "500px",
                    }}
                    pageable={{
                        pageSizes: true,
                    }}
                    data={topMovies}
                    sortable={true}
                    total={resultState.total}
                    onDataStateChange={dataStateChange}
                    {...dataState}
                    onExpandChange={onExpandChange}
                    expandField="expanded"
                    dataItemKey={DATA_ITEM_KEY}
                    selectedField={SELECTED_FIELD}
                    onHeaderSelectionChange={onHeaderSelectionChange}
                    onSelectionChange={onSelectionChange}
                    groupable={true}
                    size={"small"}
                >
                    <GridToolbar>
                        <Input
                            value={filterValue}
                            onChange={onFilterChange}
                            style={{
                                border: "2px solid #ccc",
                                boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
                                width: "170px",
                                height: "30px",
                                marginRight: "10px",
                            }}
                            placeholder="Search in all columns..."
                        />
                        <div className="export-btns-container">
                            <Button onClick={exportExcel}>Export to Excel</Button>
                            <Button>Export to PDF</Button>
                        </div>
                    </GridToolbar>
                    <Column
                        filterable={false}
                        field={SELECTED_FIELD}
                        width={50}
                        headerSelectionValue={checkHeaderSelectionValue()}
                    />
                    <Column title="Movie">
                        <Column
                            field="title"
                            title="Title"
                            columnMenu={ColumnMenu}
                            width="250px"
                        />
                        <Column
                            field="director"
                            title="Director"
                            columnMenu={ColumnMenu}
                            width="220px"
                        />
                    </Column>
                    <Column title="Info">
                        <Column
                            field="average_score"
                            title="Average Score"
                            cell={(props) => (
                                <td>
                                    IMDB: {typeof props.dataItem[props.field] === 'number' ? props.dataItem[props.field].toFixed(1) : props.dataItem[props.field]} <FontAwesomeIcon icon={faStar} color="orange" />
                                </td>
                            )}
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                        <Column
                            field="created_at"
                            title="Release at"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: CreatedDateCell,
                            }}
                            width="230px"
                        />
                        <Column
                            field="updated_at"
                            title="Updated at"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: UpdateddDateCell,
                            }}
                            width="250px"
                        />
                    </Column>
                </Grid>
            </GridPDFExport>
        </div>
    );
};


export default MoviesGrid;  