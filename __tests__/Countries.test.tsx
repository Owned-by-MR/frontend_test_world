import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Countries from '../components/Countries'
import { gql } from '@apollo/client'

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`

const mocks = [
  {
    request: { query: GET_COUNTRIES },
    result: {
      data: {
        countries: [
          { code: "UK", name: "United Kingdom", continent: { name: "Europe" } },
          { code: "US", name: "United States", continent: { name: "North America" } },
        ],
      },
    },
  },
]

describe('Countries Component', () => {
  test('renders search input', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>
    )

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument())
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument()
  })

  test('filters countries based on search', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>
    )

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument())

    fireEvent.change(screen.getByPlaceholderText('Search for a country...'), {
      target: { value: 'United Kingdom' },
    })

    await waitFor(() => expect(screen.getByText('United Kingdom')).toBeInTheDocument())
    expect(screen.queryByText('United States')).not.toBeInTheDocument()
  })
})
