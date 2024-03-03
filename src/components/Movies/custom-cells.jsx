import * as React from "react";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import {
  GridColumnMenuSort,
  GridColumnMenuFilter,
  GridColumnMenuGroup,
} from "@progress/kendo-react-grid";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import { Rating } from "@progress/kendo-react-inputs";
import { format } from 'date-fns';

export const BadgeCell = (props) => {
  const { dataItem } = props;
  const isOnline = dataItem.is_online;
  return (
    <td {...props.tdProps}>
      <BadgeContainer>
        {isOnline ? (
          <Badge size="small" themeColor="success" cutoutBorder={true}>
            <span>Online</span>
          </Badge>
        ) : (
          <Badge
            size="small"
            align={{
              vertical: "bottom",
              horizontal: "end",
            }}
            themeColor="error"
            cutoutBorder={true}
          >
            <span>Offline</span>
          </Badge>
        )}
      </BadgeContainer>
    </td>
  );
};

export const UpdatedDateCell = (props) => {
  const { dataItem } = props;
  if (dataItem && dataItem.updated_at !== undefined) {
    const date = new Date(dataItem.updated_at);
    const formattedDate = format(date, 'yyyy-MM-dd');
    return <td {...props.tdProps}>{formattedDate}</td>;
  }
};

export const CreatedDateCell = (props) => {
  const { dataItem } = props;
  if (dataItem && dataItem.created_at !== undefined) {
    const date = new Date(dataItem.created_at);
    const formattedDate = format(date, 'yyyy-MM-dd');
    return <td {...props.tdProps}>{formattedDate}</td>;
  }
};


export const ColumnMenu = (props) => {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} />
      <GridColumnMenuGroup {...props} />
    </div>
  );
};
export const PersonCell = (props) => {
  const { dataItem } = props;
  if (!dataItem || !dataItem.image) {
    return dataItem.full_name;
  }
  const imageDataUrl = dataItem.image.replace(/url\('(.*)'\)/, "$1");
  return (
    <td {...props.tdProps}>
      <img src={imageDataUrl} width="34" height="34" className="contact-img" />
      <span
        style={{
          display: "inlineBlock",
          paddingLeft: "10px",
          verticalAlign: "middle",
          lineHeight: "32px",
        }}
        className="person-name"
      >
        {dataItem.full_name}
      </span>
    </td>
  );
};
export const ProgressCell = (props) => {
  const progress = props.dataItem.target;
  if (props.rowType === "groupHeader") {
    return;
  }
  return (
    <td {...props.tdProps}>
      <ProgressBar
        style={{
          width: "150px",
          height: "10px",
          marginRight: "20px",
        }}
        value={progress}
        labelVisible={false}
      />
      {progress} %<span> </span>
    </td>
  );
};
export const RatingCell = (props) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  if (props.rowType === "groupHeader") {
    return null;
  }
  return (
    <td {...props.tdProps}>
      <Rating
        defaultValue={0}
         max={10}
        value={value === null ? "" : props.dataItem[field]}
        readonly={true}
      />{" "}
    </td>
  );
};