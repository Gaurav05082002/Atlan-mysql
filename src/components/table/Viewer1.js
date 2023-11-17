import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { Button, KIND } from 'baseui/button';
import { TriangleDown } from 'baseui/icon';
import { StatefulMenu } from 'baseui/menu';
import { Pagination } from 'baseui/pagination';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { Table } from 'baseui/table';
import './Viewer.css';

const PaginatedTable = (props) => {
  const [css, theme] = useStyletron();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > Math.ceil(props.data.length / limit)) {
      return;
    }
    setPage(nextPage);
  };

  const handleLimitChange = (nextLimit) => {
    const nextPageNum = Math.ceil(props.data.length / nextLimit);
    if (nextPageNum < page) {
      setLimit(nextLimit);
      setPage(nextPageNum);
    } else {
      setLimit(nextLimit);
    }
  };

  const window = () => {
    const min = (page - 1) * limit;
    return props.data.slice(min, min + limit);
  };

  return (
    <>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
        })}
      >
        <div
          className={css({
            fontFamily: theme.typography.font750.fontFamily,
            fontWeight: theme.typography.font750.fontWeight,
            fontSize: theme.typography.font750.fontSize,
            lineHeight: theme.typography.font750.lineHeight,
          })}
        >
          Table Example
        </div>
        <Button>
          <div
            className={css({
              paddingLeft: theme.sizing.scale1200,
              paddingRight: theme.sizing.scale1200,
            })}
          >
            Action
          </div>
        </Button>
      </div>
      <div className={css({ height: '500px' })}>
        <Table columns={props.columns} data={window()} />
      </div>
      <div
        className={css({
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
          paddingRight: theme.sizing.scale800,
          paddingLeft: theme.sizing.scale800,
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <StatefulPopover
          content={({ close }) => (
            <StatefulMenu
              items={[...new Array(100)].map((_, i) => ({
                label: i + 1,
              }))}
              onItemSelect={({ item }) => {
                handleLimitChange(item.label);
                close();
              }}
              overrides={{
                List: {
                  style: { height: '150px', width: '100px' },
                },
              }}
            />
          )}
          placement={PLACEMENT.bottom}
        >
          <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
            {`${limit} Rows`}
          </Button>
        </StatefulPopover>

        <Pagination
          currentPage={page}
          numPages={Math.ceil(props.data.length / limit)}
          onPageChange={({ nextPage }) => handlePageChange(nextPage)}
        />
      </div>
    </>
  );
};

const COLUMNS = [...new Array(5)].map(() => 'Label');
const DATA = [...new Array(45)].map((_, i) =>
  [...new Array(5)].map(() => `row: ${i + 1}`),
);

const Viewer1 = () => (
  <PaginatedTable columns={COLUMNS} data={DATA} />
);

export default Viewer1;
