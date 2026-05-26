'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Dropdown,
  DropdownBody,
  DropdownTrigger,
  Pagination,
  PaginationButton,
  PaginationItems,
  SearchInput,
  Select,
  Stack,
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
  BellIcon,
  ChevronDownIcon,
  ChevronDownMiniIcon,
} from '@deliveryhero/cape-icons';
import Sidenav from './components/Sidenav';

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
  failed: '__failed__' as StatusType,
  draft: '__draft__' as StatusType,
};

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const AVATAR_URL = 'https://www.figma.com/api/mcp/asset/70644811-13d9-4801-b6dd-018d54cd5296';

const CHAIN_TEXT_STYLE = { '--cp-tag-text-color': 'rgba(0,0,0,0.87)' } as React.CSSProperties;

const PROMO_TYPES = [
  'Strikethrough',
  'Multi-Buy (Mix & Match)',
  'Multi-Buy (Same Item)',
  'Buy One Get One',
  'Percentage Discount',
  'Fixed Price',
  'Bundle Deal',
];
const CHAINS = [
  'Talabat Dmarts East Kuwait',
  'Carrefour',
  'LuLu',
  'Talabat Dmarts West Kuwait',
  'Choithrams',
  'Spinneys',
  'Waitrose',
];
const STORES = [
  'UAE',
  'Kuwait',
  'Qatar',
  'Saudi Arabia',
  'Bahrain',
  'Oman',
  'Jordan',
  'Egypt',
];

const chipStyle = (active: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '0 12px',
  height: '32px',
  border: `1px solid ${active ? 'var(--cp-action-color-branded-primary-enabled, #3a22d5)' : 'var(--cp-border-color-high, #ceced4)'}`,
  borderRadius: '100px',
  backgroundColor: active ? 'rgba(58,34,213,0.08)' : 'transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontWeight: 500,
  color: active
    ? 'var(--cp-action-color-branded-primary-enabled, #3a22d5)'
    : 'var(--cp-text-color-primary, #141415)',
  outline: 'none',
  whiteSpace: 'nowrap',
});

const tabBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '18px',
  height: '18px',
  borderRadius: '100px',
  backgroundColor: 'var(--cp-action-color-branded-primary-enabled, #3a22d5)',
  color: '#fff',
  fontSize: '11px',
  fontWeight: 700,
  padding: '0 5px',
  marginLeft: '4px',
  lineHeight: 1,
};

export default function PromotionsPage() {
  const [sidenavCollapsed, setSidenavCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [activeTab, setActiveTab] = useState('all');
  const [promoTypeFilter, setPromoTypeFilter] = useState<string | null>(null);
  const [chainFilter, setChainFilter] = useState<string | null>(null);
  const [storeFilter, setStoreFilter] = useState<string | null>(null);

  const filteredPromotions = useMemo(() => {
    if (activeTab === 'failed' || activeTab === 'draft') return [];

    let result = ALL_PROMOTIONS;
    const tabStatus = TAB_STATUS_MAP[activeTab];
    if (tabStatus !== null) {
      result = result.filter((p) => p.status === tabStatus);
    }

    if (promoTypeFilter) {
      result = result.filter((p) => p.type === promoTypeFilter);
    }

    if (chainFilter) {
      result = result.filter((p) =>
        p.chains.some((c) => c.toLowerCase().includes(chainFilter.toLowerCase()))
      );
    }

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
  }, [activeTab, promoTypeFilter, chainFilter, searchQuery]);

  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage);
  const pagedPromotions = filteredPromotions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const countByStatus = (status: StatusType) =>
    ALL_PROMOTIONS.filter((p) => p.status === status).length;

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <Sidenav collapsed={sidenavCollapsed} onToggle={() => setSidenavCollapsed((v) => !v)} />

      {/* ── Main content ── */}
      <Box
        style={{
          marginLeft: sidenavCollapsed ? '80px' : '296px',
          flex: 1,
          backgroundColor: 'var(--cp-base-color-flat, #fff)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100dvh',
          transition: 'margin-left 0.25s ease',
          padding: '0 20px',
        }}
      >
        {/* ── Page header ── */}
        <Box style={{ paddingBlock: '16px' }}>
          <Stack
            direction="row"
            style={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: '36px',
                fontWeight: 700,
                lineHeight: 1.33,
                color: 'var(--cp-text-color-primary, #141415)',
                fontFamily: 'var(--font-figtree, Figtree), system-ui, sans-serif',
              }}
            >
              Promotions
            </h1>

            <Stack direction="row" spacing="20px" style={{ alignItems: 'center' }}>
              {/* Singapore pill */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 12px',
                  height: '40px',
                  border: '1px solid var(--cp-border-color-high, #ceced4)',
                  borderRadius: '200px',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--cp-text-color-primary, #141415)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Singapore
                </span>
                <ChevronDownIcon size="small" />
              </button>

              {/* Notification button */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '1px solid var(--cp-border-color-high, #ceced4)',
                  borderRadius: '200px',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  flexShrink: 0,
                  color: 'var(--cp-text-color-primary, #141415)',
                }}
              >
                <BellIcon size="medium" />
              </button>

              {/* Avatar */}
              <Box
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid var(--cp-border-color-high, #ceced4)',
                  backgroundColor: 'var(--cp-border-color-high, #ceced4)',
                }}
              >
                <img
                  src={AVATAR_URL}
                  alt="User avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* ── Body ── */}
        <Box
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingBottom: '24px',
          }}
        >
          {/* Controls: tabs + actions in one row */}
          <Stack
            direction="row"
            spacing="32px"
            style={{
              alignItems: 'center',
              backgroundColor: 'var(--cp-base-color-flat, #fff)',
              borderBottom: '1px solid var(--cp-border-color-low, #e6e6eb)',
            }}
          >
            {/* Tabs */}
            <Box style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <Tabs active={activeTab} onChange={handleTabChange} size="medium" divider={false}>
                <TabList>
                  <TabItem value="all">All</TabItem>
                  <TabItem value="running">
                    Running
                    {countByStatus('Running') > 0 && (
                      <span style={tabBadgeStyle}>{countByStatus('Running')}</span>
                    )}
                  </TabItem>
                  <TabItem value="upcoming">Upcoming</TabItem>
                  <TabItem value="ended">Ended</TabItem>
                  <TabItem value="cancelled">Cancelled</TabItem>
                  <TabItem value="failed">Failed</TabItem>
                  <TabItem value="draft">Draft</TabItem>
                </TabList>
              </Tabs>
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing="12px" style={{ alignItems: 'center', flexShrink: 0 }}>
              <SearchInput
                placeholder="Search here"
                size="small"
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
              <Button variant="primary" size="small" status="branded">
                Create Promotion
              </Button>
            </Stack>
          </Stack>

          {/* ── Filter chips ── */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            {[
              { label: 'Promo type', value: promoTypeFilter, setValue: setPromoTypeFilter, options: PROMO_TYPES },
              { label: 'Chains', value: chainFilter, setValue: setChainFilter, options: CHAINS },
              { label: 'Stores', value: storeFilter, setValue: setStoreFilter, options: STORES },
            ].map(({ label, value, setValue, options }) => (
              <span key={label} style={{ display: 'inline-flex' }}>
                <Dropdown>
                  <DropdownTrigger>
                    <button style={chipStyle(!!value)}>
                      {value ? `${label}: ${value}` : label}
                      <ChevronDownMiniIcon size="small" />
                    </button>
                  </DropdownTrigger>
                  <DropdownBody>
                    <Box style={{ padding: '8px 0', minWidth: '200px', maxHeight: '220px', overflowY: 'auto' }}>
                      <Button
                        variant="tertiary"
                        size="medium"
                        style={{ width: '100%', justifyContent: 'flex-start', fontWeight: !value ? 700 : undefined }}
                        onClick={() => setValue(null)}
                      >
                        All
                      </Button>
                      {options.map((opt) => (
                        <Button
                          key={opt}
                          variant="tertiary"
                          size="medium"
                          style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            fontWeight: value === opt ? 700 : undefined,
                          }}
                          onClick={() => setValue(opt)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </Box>
                  </DropdownBody>
                </Dropdown>
              </span>
            ))}
          </div>

          {/* ── Table card ── */}
          <Box
            style={{
              flex: 1,
              backgroundColor: 'var(--cp-base-color-flat, #fff)',
              border: '1px solid var(--cp-border-color-high, #dbdbdb)',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
                      <TableCell colSpan={7}>
                        <Box style={{ padding: '32px 0', textAlign: 'center' }}>
                          <Typography
                            as="p"
                            variant="bodySmall"
                            style={{ color: 'var(--cp-text-color-tertiary)', margin: 0 }}
                          >
                            No promotions match your filters.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagedPromotions.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell>
                          <Stack direction="column" spacing="2px">
                            <Typography
                              as="p"
                              variant="labelSmall"
                              style={{
                                color: 'var(--cp-text-color-primary)',
                                opacity: 0.5,
                                margin: 0,
                                lineHeight: '14px',
                              }}
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
                          <Stack
                            direction="row"
                            spacing="6px"
                            style={{ alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}
                          >
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
                            <Typography
                              as="p"
                              variant="bodySmall"
                              style={{ margin: 0, lineHeight: '20px' }}
                            >
                              {promo.startDate}
                            </Typography>
                            <Typography
                              as="p"
                              variant="labelSmall"
                              style={{
                                color: 'var(--cp-text-color-secondary)',
                                margin: 0,
                                lineHeight: '14px',
                              }}
                            >
                              {promo.startTime}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Stack direction="column" spacing="2px">
                            <Typography
                              as="p"
                              variant="bodySmall"
                              style={{ margin: 0, lineHeight: '20px' }}
                            >
                              {promo.endDate}
                            </Typography>
                            <Typography
                              as="p"
                              variant="labelSmall"
                              style={{
                                color: 'var(--cp-text-color-secondary)',
                                margin: 0,
                                lineHeight: '14px',
                              }}
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
                                style={{
                                  color: 'var(--cp-text-color-primary)',
                                  margin: 0,
                                  lineHeight: '14px',
                                }}
                              >
                                Last edited: {promo.lastEdited}
                              </Typography>
                            )}
                            {promo.createdOn && (
                              <Typography
                                as="p"
                                variant="labelSmall"
                                style={{
                                  color: 'var(--cp-text-color-tertiary)',
                                  margin: 0,
                                  lineHeight: '14px',
                                }}
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
            <Box
              style={{
                padding: '12px 24px',
                borderTop: '1px solid var(--cp-border-color-low, #e6e6eb)',
              }}
            >
              <Pagination
                count={Math.max(totalPages, 1)}
                current={currentPage}
                onChange={setCurrentPage}
              >
                <Select
                  className="cape-pagination-items-per-page"
                  size="xsmall"
                  style={{ minWidth: 'max-content' }}
                  value={String(itemsPerPage)}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="" disabled>Per Page</option>
                  {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                    <option key={opt} value={String(opt)}>{opt}</option>
                  ))}
                </Select>
                <PaginationButton action="prev" />
                <PaginationItems />
                <PaginationButton action="next" />
              </Pagination>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
