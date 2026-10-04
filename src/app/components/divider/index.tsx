import styled from "styled-components";

export interface IDividerProps {
    width?: string;
    height?: string;
    bg?: string;
}

const toCssSize = (value?: string) => (value && /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value);

const DividerComponent = styled.span<IDividerProps>`
    display: flex;
    min-width: ${({ width }) => toCssSize(width)};
    min-height: ${({ height }) => toCssSize(height)};
    background: ${({ bg }) => `${bg}`};
`;

function Divider(props: IDividerProps) {
    return <DividerComponent {...props} />;
}

export default Divider;