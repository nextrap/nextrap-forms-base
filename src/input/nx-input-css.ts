import {css} from "lit";

// The styles for nx-input (boostrap form)
// language=css
export const nxCss = css`

    :host {
        --input-border-color: #ced4da;
        --input-border-color-focus: #007bff;
        --input-border-color-invalid: #dc3545;
        --input-border-color-valid: #28a745;
        --input-padding-top: 0.375rem;
        --input-padding-bottom: 0.375rem;

        display: block;
        margin-top: var(--input-padding-top, 0.375rem);
    }

    ::slotted(input) {
        width: 100%;

    }


`;
