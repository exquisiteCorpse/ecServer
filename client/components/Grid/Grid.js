import React from 'react'
import styled from 'styled-components'

/* -----------------    UTILITY     ------------------ */

function getWidthString (span) {
  if (!span) return

  let width = span / 12 * 100
  return `width: ${width}%`
}

/* -----------------    ROW     ------------------ */

export const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`

/* -----------------    COLUMN     ------------------ */

export const Column = styled.div`
  float: left;
  padding-left: 0.9375em;
  padding-right: 0.9375em;
  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%')}

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)}
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)}
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)}
  }
`
/* -----------------    GRID     ------------------ */

// export default function Grid (props) {
//   return (
//     <div>
//       <Row>
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//         <Column span='1' />
//       </Row>
//     </div>
//   )
// }
