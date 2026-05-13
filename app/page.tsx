'use client';

import { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  DropdownBody,
  DropdownTrigger,
  Pagination,
  PaginationButton,
  PaginationItems,
  PaginationItemsPerPage,
  SearchInput,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TabItem,
  TabList,
  Tabs,
  Tag,
  Typography,
} from '@deliveryhero/cape-core';
import {
  AiSparklesFilledIcon,
  ChevronDownIcon,
  FilterIcon,
  LocationOnIcon,
} from '@deliveryhero/cape-icons';

type StatusType = 'Upcoming' | 'Ending Soon' | 'Running' | 'Ended' | 'Cancelled';
type CreatorType = 'Co-pilot' | 'Gsheet Import' | 'Internal User';

type Promotion = {
  id: string;
  type: string;
  name: string;
  status: StatusType | null;
  createdBy: CreatorType;
  chains: string[];
  moreChains: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  lastEdited?: string;
  createdOn?: string;
};

const ALL_PROMOTIONS: Promotion[] = [
  {
    id: '1',
    type: 'Strikethrough',
    name: 'Flash Sale for QC trials',
    status: 'Upcoming',
    createdBy: 'Co-pilot',
    chains: ['Talabat Dmarts East Kuwait'],
    moreChains: 0,
    startDate: '15/04/2026',
    startTime: '10:00',
    endDate: '15/10/2026',
    endTime: '23:59',
    lastEdited: '02/04/2026 6:20',
    createdOn: '20/03/2026 9:20',
  },
  {
    id: '2',
    type: 'Strikethrough',
    name: 'Flash Sale for QC trials',
    status: 'Upcoming',
    createdBy: 'Co-pilot',
    chains: ['Talabat Dmarts East Kuwait'],
    moreChains: 0,
    startDate: '15/05/2026',
    startTime: '10:00',
    endDate: '15/11/2026',
    endTime: '23:59',
    lastEdited: '22/10/2021 16:20',
    createdOn: '20/04/2023 09:20',
  },
  {
    id: '3',
    type: 'Multi-Buy (Mix & Match)',
    name: 'Buy 2 get 1 Free - P&G',
    status: 'Upcoming',
    createdBy: 'Gsheet Import',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 3,
    startDate: '30/05/2026',
    startTime: '10:00',
    endDate: '10/06/2026',
    endTime: '23:59',
    lastEdited: '22/10/2021 16:20',
    createdOn: '20/04/2023 09:20',
  },
  {
    id: '4',
    type: 'Multi-Buy (Same Item)',
    name: "Ben & Jerry's - Buy 3 for $25",
    status: 'Upcoming',
    createdBy: 'Gsheet Import',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 3,
    startDate: '30/05/2026',
    startTime: '10:00',
    endDate: '10/06/2026',
    endTime: '23:59',
    lastEdited: '22/10/2021 16:20',
    createdOn: '20/04/2023 09:20',
  },
  {
    id: '5',
    type: 'Multi-Buy (Mix & Match)',
    name: 'Rice - Buy 5kg for $30',
    status: 'Ending Soon',
    createdBy: 'Internal User',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 3,
    startDate: '01/03/2026',
    startTime: '10:00',
    endDate: '15/05/2026',
    endTime: '23:59',
    lastEdited: '22/10/2021 16:20',
    createdOn: '19/04/2023 09:00',
  },
  {
    id: '6',
    type: 'Multi-Buy (Same Item)',
    name: 'All Red Bull Beverage - Buy 3 for $10',
    status: 'Running',
    createdBy: 'Internal User',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 3,
    startDate: '01/01/2026',
    startTime: '00:00',
    endDate: '31/12/2026',
    endTime: '23:59',
    lastEdited: '22/10/2025 16:20',
    createdOn: '19/04/2023 09:00',
  },
  {
    id: '7',
    type: 'Multi-Buy (Mix & Match)',
    name: 'Dove Body Soap - Bundle for $15',
    status: 'Running',
    createdBy: 'Internal User',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 3,
    startDate: '10/02/2026',
    startTime: '08:00',
    endDate: '10/08/2026',
    endTime: '23:59',
    lastEdited: '08/02/2026 11:00',
    createdOn: '19/04/2023 09:00',
  },
  {
    id: '8',
    type: 'Strikethrough',
    name: 'Ramadan Special - 20% off all items',
    status: 'Running',
    createdBy: 'Co-pilot',
    chains: ['Carrefour'],
    moreChains: 0,
    startDate: '01/03/2026',
    startTime: '00:00',
    endDate: '30/03/2026',
    endTime: '23:59',
    lastEdited: '28/02/2026 09:00',
    createdOn: '15/02/2026 14:30',
  },
  {
    id: '9',
    type: 'Multi-Buy (Same Item)',
    name: 'Coca-Cola 6-Pack Bundle',
    status: 'Running',
    createdBy: 'Gsheet Import',
    chains: ['Talabat Dma...', 'Carrefour', 'LuLu'],
    moreChains: 2,
    startDate: '15/04/2026',
    startTime: '10:00',
    endDate: '14/07/2026',
    endTime: '23:59',
    lastEdited: '12/04/2026 10:45',
    createdOn: '10/04/2026 08:00',
  },
  {
    id: '10',
    type: 'Strikethrough',
    name: 'Weekend Flash - Dairy Products 15% off',
    status: 'Ending Soon',
    createdBy: 'Co-pilot',
    chains: ['Talabat Dmarts East Kuwait'],
    moreChains: 0,
    startDate: '01/05/2026',
    startTime: '00:00',
    endDate: '15/05/2026',
    endTime: '23:59',
    lastEdited: '29/04/2026 17:00',
    createdOn: '28/04/2026 12:00',
  },
  {
    id: '11',
    type: 'Multi-Buy (Mix & Match)',
    name: 'Snack Bundle - Any 3 for $12',
    status: 'Ended',
    createdBy: 'Gsheet Import',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 1,
    startDate: '01/01/2026',
    startTime: '00:00',
    endDate: '28/02/2026',
    endTime: '23:59',
    lastEdited: '15/12/2025 09:30',
    createdOn: '10/12/2025 11:00',
  },
  {
    id: '12',
    type: 'Strikethrough',
    name: 'New Year Mega Sale - 25% off',
    status: 'Ended',
    createdBy: 'Internal User',
    chains: ['Carrefour', 'LuLu'],
    moreChains: 2,
    startDate: '25/12/2025',
    startTime: '00:00',
    endDate: '05/01/2026',
    endTime: '23:59',
    lastEdited: '20/12/2025 14:00',
    createdOn: '18/12/2025 10:00',
  },
  {
    id: '13',
    type: 'Multi-Buy (Same Item)',
    name: "Lay's Chips - Buy 4 for $8",
    status: 'Ended',
    createdBy: 'Co-pilot',
    chains: ['Talabat Dma...'],
    moreChains: 2,
    startDate: '10/03/2025',
    startTime: '09:00',
    endDate: '10/04/2025',
    endTime: '23:59',
    lastEdited: '07/03/2025 15:00',
    createdOn: '05/03/2025 09:00',
  },
  {
    id: '14',
    type: 'Strikethrough',
    name: 'Summer Drinks - 30% off selected',
    status: 'Cancelled',
    createdBy: 'Internal User',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 3,
    startDate: '01/06/2025',
    startTime: '00:00',
    endDate: '31/08/2025',
    endTime: '23:59',
    lastEdited: '25/05/2025 10:00',
    createdOn: '20/05/2025 08:00',
  },
  {
    id: '15',
    type: 'Multi-Buy (Mix & Match)',
    name: 'Breakfast Bundle - Cereal + Milk',
    status: 'Cancelled',
    createdBy: 'Gsheet Import',
    chains: ['LuLu'],
    moreChains: 0,
    startDate: '15/02/2026',
    startTime: '08:00',
    endDate: '15/03/2026',
    endTime: '23:59',
    lastEdited: '10/02/2026 12:00',
    createdOn: '08/02/2026 10:00',
  },
  {
    id: '16',
    type: 'Strikethrough',
    name: 'Organic Produce - 10% off weekly',
    status: 'Upcoming',
    createdBy: 'Co-pilot',
    chains: ['Carrefour', 'LuLu'],
    moreChains: 1,
    startDate: '01/06/2026',
    startTime: '00:00',
    endDate: '30/06/2026',
    endTime: '23:59',
    lastEdited: '25/05/2026 09:00',
    createdOn: '20/05/2026 14:00',
  },
  {
    id: '17',
    type: 'Multi-Buy (Same Item)',
    name: 'Water 1.5L - Buy 6 get 1 free',
    status: 'Running',
    createdBy: 'Internal User',
    chains: ['Talabat Dma...', 'Carrefour'],
    moreChains: 4,
    startDate: '01/04/2026',
    startTime: '00:00',
    endDate: '30/06/2026',
    endTime: '23:59',
    lastEdited: '30/03/2026 16:00',
    createdOn: '25/03/2026 11:00',
  },
];

const STATUS_TAG: Record<StatusType, 'warning' | 'error' | 'success' | 'neutral' | 'disabled'> = {
  Upcoming: 'warning',
  'Ending Soon': 'error',
  Running: 'success',
  Ended: 'neutral',
  Cancelled: 'disabled',
};

const TAB_STATUS_MAP: Record<string, StatusType | null> = {
  all: null,
  running: 'Running',
  upcoming: 'Upcoming',
  ended: 'Ended',
  cancelled: 'Cancelled',
  processing: '__processing__' as StatusType,
};

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];
const CREATORS: CreatorType[] = ['Co-pilot', 'Gsheet Import', 'Internal User'];

const CHAIN_TEXT_STYLE = { '--cp-tag-text-color': 'rgba(0,0,0,0.87)' } as React.CSSProperties;

export default function PromotionsPage() {
  const [showMyPromotions, setShowMyPromotions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [activeTab, setActiveTab] = useState('all');
  const [createdByFilter, setCreatedByFilter] = useState<CreatorType | null>(null);

  const filteredPromotions = useMemo(() => {
    let result = ALL_PROMOTIONS;

    // Tab filter (by status)
    const tabStatus = TAB_STATUS_MAP[activeTab];
    if (activeTab === 'processing') {
      return []; // no processing items in dataset
    }
    if (tabStatus !== null) {
      result = result.filter((p) => p.status === tabStatus);
    }

    // "Show only my promotions" — treat "Internal User" as current user
    if (showMyPromotions) {
      result = result.filter((p) => p.createdBy === 'Internal User');
    }

    // Created by dropdown filter
    if (createdByFilter) {
      result = result.filter((p) => p.createdBy === createdByFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.chains.some((c) => c.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeTab, showMyPromotions, createdByFilter, searchQuery]);

  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage);
  const pagedPromotions = filteredPromotions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allSelected =
    pagedPromotions.length > 0 &&
    pagedPromotions.every((p) => selectedRows.has(p.id));
  const someSelected =
    pagedPromotions.some((p) => selectedRows.has(p.id)) && !allSelected;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedRows(new Set());
  };

  const handleCreatedByFilter = (creator: CreatorType | null) => {
    setCreatedByFilter(creator);
    setCurrentPage(1);
    setSelectedRows(new Set());
  };

  const toggleSelectAll = () => {
    if (allSelected || someSelected) {
      const next = new Set(selectedRows);
      pagedPromotions.forEach((p) => next.delete(p.id));
      setSelectedRows(next);
    } else {
      const next = new Set(selectedRows);
      pagedPromotions.forEach((p) => next.add(p.id));
      setSelectedRows(next);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const createdByLabel = createdByFilter
    ? `Created by: ${createdByFilter}`
    : 'Created by (All)';

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--cp-surface-color-secondary, #f4f5f6)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── App shell nav bar ── */}
      <Box
        style={{
          height: '51px',
          backgroundColor: 'var(--cp-surface-color-default, #fff)',
          borderBottom: '1px solid var(--cp-border-color-low, #e6e6eb)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Typography
          as="span"
          variant="subtitleLarge"
          style={{
            color: 'var(--cp-action-color-branded-primary-enabled)',
            fontWeight: 700,
            fontSize: '18px',
          }}
        >
          foodpanda
        </Typography>
        <Stack direction="row" spacing="4px" style={{ alignItems: 'center' }}>
          <Button variant="tertiary" size="small" endIcon={<ChevronDownIcon />}>
            All Plugins
          </Button>
          <Button variant="tertiary" size="small" startIcon={<LocationOnIcon />}>
            Singapore
          </Button>
          <Avatar initials="S" />
        </Stack>
      </Box>

      {/* ── Page content ── */}
      <Box style={{ padding: '14px 26px 32px', flex: 1 }}>
        {/* Page header */}
        <Stack
          direction="row"
          style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
        >
          <Stack direction="row" spacing="12px" style={{ alignItems: 'center' }}>
            <Typography
              as="span"
              variant="subtitleLarge"
              style={{
                color: 'var(--cp-text-color-primary)',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '27px',
                letterSpacing: '0.15px',
              }}
            >
              Promo Tool
            </Typography>
            <Typography
              as="span"
              variant="subtitleLarge"
              style={{
                color: 'var(--cp-action-color-branded-primary-enabled)',
                fontWeight: 700,
                fontSize: '16px',
                letterSpacing: '0.15px',
              }}
            >
              Promotions
            </Typography>
          </Stack>

          <Stack direction="row" spacing="8px" style={{ alignItems: 'center' }}>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="secondary" size="small" status="branded" endIcon={<ChevronDownIcon />}>
                  Create New Promotion
                </Button>
              </DropdownTrigger>
              <DropdownBody>
                <Box style={{ minWidth: '213px', padding: '8px 0' }}>
                  <Button variant="tertiary" size="medium" style={{ width: '100%', justifyContent: 'flex-start' }}>
                    Upload Spreadsheet
                  </Button>
                  <Divider />
                  <Button variant="tertiary" size="medium" style={{ width: '100%', justifyContent: 'flex-start' }}>
                    Create Manually
                  </Button>
                </Box>
              </DropdownBody>
            </Dropdown>

            <Button variant="primary" size="small" status="branded" startIcon={<AiSparklesFilledIcon />}>
              Generate Promotion with Co-pilot
            </Button>
          </Stack>
        </Stack>

        {/* ── Main content card ── */}
        <Box
          style={{
            backgroundColor: 'var(--cp-surface-color-default, #fff)',
            borderRadius: '32px',
            overflow: 'hidden',
          }}
        >
          {/* Tabs row + toggle */}
          <Stack
            direction="row"
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: '24px',
              paddingTop: '12px',
              borderBottom: '1px solid var(--cp-border-color-low, #e6e6eb)',
            }}
          >
            <Tabs active={activeTab} onChange={handleTabChange} size="medium" divider={false}>
              <TabList>
                <TabItem value="all">All</TabItem>
                <TabItem value="running">
                  Running ({ALL_PROMOTIONS.filter((p) => p.status === 'Running').length})
                </TabItem>
                <TabItem value="upcoming">
                  Upcoming ({ALL_PROMOTIONS.filter((p) => p.status === 'Upcoming').length})
                </TabItem>
                <TabItem value="ended">
                  Ended ({ALL_PROMOTIONS.filter((p) => p.status === 'Ended').length})
                </TabItem>
                <TabItem value="cancelled">
                  Cancelled ({ALL_PROMOTIONS.filter((p) => p.status === 'Cancelled').length})
                </TabItem>
                <TabItem value="processing">Processing/Failed (0)</TabItem>
              </TabList>
            </Tabs>

            <Stack direction="row" spacing="8px" style={{ alignItems: 'center', flexShrink: 0 }}>
              <Typography as="span" variant="bodySmall" style={{ whiteSpace: 'nowrap' }}>
                Show only my promotions
              </Typography>
              <Switch
                label="Show only my promotions"
                hideLabel
                checked={showMyPromotions}
                onChange={(e) => {
                  setShowMyPromotions(e.target.checked);
                  setCurrentPage(1);
                }}
              />
            </Stack>
          </Stack>

          {/* Search + filter controls */}
          <Stack direction="row" spacing="12px" style={{ alignItems: 'center', padding: '16px 24px' }}>
            <Box style={{ flex: 1 }}>
              <SearchInput
                placeholder="Search Promotion"
                size="medium"
                value={searchQuery}
                onChange={(val) => {
                  setSearchQuery(val);
                  setCurrentPage(1);
                }}
                onClear={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
              />
            </Box>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="secondary"
                  size="small"
                  status={createdByFilter ? 'branded' : undefined}
                  endIcon={<ChevronDownIcon />}
                >
                  {createdByLabel}
                </Button>
              </DropdownTrigger>
              <DropdownBody>
                <Box style={{ padding: '8px 0', minWidth: '180px' }}>
                  <Button
                    variant="tertiary"
                    size="medium"
                    style={{ width: '100%', justifyContent: 'flex-start', fontWeight: !createdByFilter ? 700 : undefined }}
                    onClick={() => handleCreatedByFilter(null)}
                  >
                    All
                  </Button>
                  <Divider />
                  {CREATORS.map((c) => (
                    <Button
                      key={c}
                      variant="tertiary"
                      size="medium"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        fontWeight: createdByFilter === c ? 700 : undefined,
                      }}
                      onClick={() => handleCreatedByFilter(c)}
                    >
                      {c}
                    </Button>
                  ))}
                </Box>
              </DropdownBody>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="secondary" size="small" startIcon={<FilterIcon />} endIcon={<ChevronDownIcon />}>
                  Filters
                </Button>
              </DropdownTrigger>
              <DropdownBody>
                <Box style={{ padding: '8px 0', minWidth: '180px' }}>
                  <Typography
                    as="p"
                    variant="labelSmall"
                    style={{ padding: '4px 16px 8px', color: 'var(--cp-text-color-tertiary)', margin: 0 }}
                  >
                    Filter by type
                  </Typography>
                  {['Strikethrough', 'Multi-Buy (Mix & Match)', 'Multi-Buy (Same Item)'].map((t) => (
                    <Button
                      key={t}
                      variant="tertiary"
                      size="medium"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t}
                    </Button>
                  ))}
                </Box>
              </DropdownBody>
            </Dropdown>
          </Stack>

          {/* Select All + result count */}
          <Stack
            direction="row"
            style={{ alignItems: 'center', justifyContent: 'space-between', paddingInline: '24px', paddingBottom: '8px' }}
          >
            <Checkbox
              label="Select All"
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleSelectAll}
              size="small"
            />
            <Typography as="span" variant="labelSmall" style={{ color: 'var(--cp-text-color-tertiary)' }}>
              {filteredPromotions.length} result{filteredPromotions.length !== 1 ? 's' : ''}
            </Typography>
          </Stack>

          {/* ── Promotions table ── */}
          <TableContainer>
            <Table
              size="small"
              dividers="row"
              style={{
                '--cp-table-cell-vertical-align': 'middle',
                '--cp-table-cell-padding-block': '8px',
              } as React.CSSProperties}
            >
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: '52px', paddingInline: '16px 8px' }} />
                  <TableHead>Promotion Name</TableHead>
                  <TableHead style={{ width: '116px' }}>Status</TableHead>
                  <TableHead style={{ width: '120px' }}>Created by</TableHead>
                  <TableHead style={{ width: '280px' }}>Chain</TableHead>
                  <TableHead style={{ width: '120px' }}>
                    <Stack direction="row" spacing="4px" style={{ alignItems: 'center' }}>
                      <span>Start Date</span>
                      <Typography as="span" variant="labelSmall">↓</Typography>
                    </Stack>
                  </TableHead>
                  <TableHead style={{ width: '110px' }}>End Date</TableHead>
                  <TableHead style={{ width: '200px' }}>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedPromotions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Box style={{ padding: '32px 0', textAlign: 'center' }}>
                        <Typography as="p" variant="bodySmall" style={{ color: 'var(--cp-text-color-tertiary)', margin: 0 }}>
                          No promotions match your filters.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  pagedPromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell style={{ paddingInline: '16px 8px' }}>
                        <Checkbox
                          label={promo.name}
                          hideLabel
                          checked={selectedRows.has(promo.id)}
                          onChange={() => toggleRow(promo.id)}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Stack direction="column" spacing="2px">
                          <Typography
                            as="p"
                            variant="labelSmall"
                            style={{ color: 'var(--cp-text-color-primary)', opacity: 0.5, margin: 0, lineHeight: '14px' }}
                          >
                            {promo.type}
                          </Typography>
                          <Typography
                            as="p"
                            variant="bodySmall"
                            style={{ fontWeight: 600, margin: 0, lineHeight: '20px' }}
                          >
                            {promo.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        {promo.status ? (
                          <Tag size="small" status={STATUS_TAG[promo.status]}>
                            {promo.status}
                          </Tag>
                        ) : null}
                      </TableCell>

                      <TableCell>
                        <Typography as="span" variant="bodySmall">
                          {promo.createdBy}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" spacing="6px" style={{ alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          {promo.chains.map((chain, i) => (
                            <Tag key={i} size="small" status="warning" style={CHAIN_TEXT_STYLE}>
                              {chain}
                            </Tag>
                          ))}
                          {promo.moreChains > 0 && (
                            <Typography
                              as="span"
                              variant="labelSmall"
                              style={{ color: 'var(--cp-text-color-tertiary)', opacity: 0.5 }}
                            >
                              +{promo.moreChains} more
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Stack direction="column" spacing="2px">
                          <Typography as="p" variant="bodySmall" style={{ margin: 0, lineHeight: '20px' }}>
                            {promo.startDate}
                          </Typography>
                          <Typography
                            as="p"
                            variant="labelSmall"
                            style={{ color: 'var(--cp-text-color-secondary)', margin: 0, lineHeight: '14px' }}
                          >
                            {promo.startTime}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Stack direction="column" spacing="2px">
                          <Typography as="p" variant="bodySmall" style={{ margin: 0, lineHeight: '20px' }}>
                            {promo.endDate}
                          </Typography>
                          <Typography
                            as="p"
                            variant="labelSmall"
                            style={{ color: 'var(--cp-text-color-secondary)', margin: 0, lineHeight: '14px' }}
                          >
                            {promo.endTime}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Stack direction="column" spacing="4px">
                          {promo.lastEdited && (
                            <Typography
                              as="p"
                              variant="labelSmall"
                              style={{ color: 'var(--cp-text-color-primary)', margin: 0, lineHeight: '14px' }}
                            >
                              Last edited: {promo.lastEdited}
                            </Typography>
                          )}
                          {promo.createdOn && (
                            <Typography
                              as="p"
                              variant="labelSmall"
                              style={{ color: 'var(--cp-text-color-tertiary)', margin: 0, lineHeight: '14px' }}
                            >
                              Created on: {promo.createdOn}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ── Pagination ── */}
          <Box style={{ padding: '12px 24px', borderTop: '1px solid var(--cp-border-color-low, #e6e6eb)' }}>
            <Pagination count={Math.max(totalPages, 1)} current={currentPage} onChange={setCurrentPage}>
              <PaginationItemsPerPage
                options={ITEMS_PER_PAGE_OPTIONS}
                label="Per Page"
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(val) => {
                  setItemsPerPage(val);
                  setCurrentPage(1);
                }}
              />
              <PaginationButton action="prev" />
              <PaginationItems />
              <PaginationButton action="next" />
            </Pagination>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
