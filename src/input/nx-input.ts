import {LitElement, html, css, ComplexAttributeConverter, TemplateResult, render} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {nxCss} from "./nx-input-css";

enum NxInputType {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
    NUMBER = 'number',
    TEL = 'tel',
    URL = 'url',
    SEARCH = 'search',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
    RADIO = 'radio'
}

class NxInputSelectOption {
    value: string|null;
    label: string;
}

class OptionsAttributeConverter implements ComplexAttributeConverter {
    fromAttribute(value: string) {
        // if not starts with { then split by comma
        if (value === "") {
            return [];
        }
        if (!value.startsWith('[')) {
            return value.split(',').map((v) => ({value: v, label: v}));
        }
        return JSON.parse(value);
    }

    toAttribute(value: any) {
        return JSON.stringify(value);
    }
}


@customElement('nx-input')
export class NxInput extends LitElement {
    @property() label = '';
    @property() value = '';
    @property() name = '';
    @property() id = '';
    @property() placeholder = '';
    @property({type: Boolean}) isFloating = false;
    @property({type: NxInputType}) type = NxInputType.TEXT;
    @property({type: Array<NxInputSelectOption>, converter: new  OptionsAttributeConverter}) options = [];
    @property() validationMessage = '';

    static styles = nxCss;



    #createFormElement() : TemplateResult {

        switch (this.type) {
            case NxInputType.TEXT:
            case NxInputType.EMAIL:
            case NxInputType.PASSWORD:
            case NxInputType.NUMBER:
            case NxInputType.TEL:
            case NxInputType.URL:
            case NxInputType.SEARCH:
                return html`<input type="${this.type}" id="${this.id}" class="form-control" placeholder="${this.placeholder}" value="${this.value}">`;
            case NxInputType.SELECT:
                return html`
                    <select  id="${this.id}" class="form-control">
                        ${this.options.map((option2) => html`<option value="${option2.value}">${option2.label}</option>`)}
                    </select>
                `;
            case NxInputType.CHECKBOX:
                return html`<input type="checkbox" class="form-check-input" value="${this.value}">`;
            case NxInputType.RADIO:
                // Create a Radio field for each option
                return html`
                    ${this.options.map(option => html`
                        <div class="form-check">
                            <input type="radio" name="${this.name}" class="form-check-input" id="${this.id + option.value}" value="${option.value}">
                            <label class="form-check-label" for="${this.id + option.value}">${option.label}</label>
                        </div>
                    `)}
                    `;
            default:
                return html`<error>Invalid nx-form element type</error>`;
        }

    }


    render() {
        if (this.id === '') {
            this.id = "nx-input-" + Math.random().toString(36).substr(2, 9);
        }
        render(this.#createFormElement(), this);
        return html`
            <div class="${this.isFloating ? 'form-floating' : ''}">

                ${this.label && !this.isFloating ? html`<label for="${this.id}">${this.label}</label>` : ''}
                ${this.isFloating ? html`<label>${this.label}</label>` : ''}
                ${this.validationMessage ? html`
                    <div class="invalid-feedback">${this.validationMessage}</div>` : ''
                }<slot></slot>
            </div>
        `;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'nx-input': NxInput;
    }
}
