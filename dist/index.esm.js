import{jsx as t}from"react/jsx-runtime";import"@testing-library/jest-dom";import{screen as e}from"@testing-library/react";class o{static assertAsMockFunction=t=>t;static assertAsMockClass=t=>t}class s{_mock;receivedProps;DATA_TEST_ID;constructor(){this.DATA_TEST_ID=Math.random().toString(36).slice(2)}_buildPropsExpectation=t=>[expect.objectContaining({...t}),expect.anything()];get mockRoot(){return e.getByTestId(this.DATA_TEST_ID)}get mockRoots(){return e.getAllByTestId(this.DATA_TEST_ID)}assertCalledWith=t=>{expect(this._mock).toHaveBeenCalledWith(...this._buildPropsExpectation(t))};assertLastCalledWith=t=>{expect(this._mock).toHaveBeenLastCalledWith(...this._buildPropsExpectation(t))};assertNthCalledWith=(t,e)=>{expect(this._mock).toHaveBeenNthCalledWith(e,...this._buildPropsExpectation(t))};assertOnScreen=(t=!0)=>{t?expect(this.mockRoots.length).toBeGreaterThanOrEqual(1):expect(this.mockRoot).toBeInTheDocument()};assertNotOnScreen=()=>{expect((()=>this.mockRoot)).toThrow()}}class i extends s{constructor(t){super(),this._mock=o.assertAsMockClass(t),this._configureMockImplementation()}_configureMockImplementation=e=>{this._mock.mockImplementation((o=>(this.receivedProps=o,{render:()=>t("div",{"data-testid":this.DATA_TEST_ID,children:e&&e(o)})})))};get __OVERRIDE__mock(){return this._mock}mockRenderReturnValue=t=>{this._configureMockImplementation((()=>t))};mockRenderImplementation=t=>{this._configureMockImplementation((e=>t(e)))}}class c extends s{constructor(t){super(),this._mock=o.assertAsMockFunction(t),this._configureMockImplementation()}_configureMockImplementation=e=>{this._mock.mockImplementation((o=>(this.receivedProps=o,t("div",{"data-testid":this.DATA_TEST_ID,children:e&&e(o)}))))};get __OVERRIDE__mock(){return this._mock}mockReturnValue=t=>{this._configureMockImplementation((()=>t))};mockImplementation=t=>{this._configureMockImplementation((e=>t(e)))}}export{o as JestUtilities,i as MockClassComponentWrapper,c as MockFunctionComponentWrapper};
//# sourceMappingURL=index.esm.js.map
