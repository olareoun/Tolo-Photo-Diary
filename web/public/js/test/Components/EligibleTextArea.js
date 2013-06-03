describe("EligibleTextarea", function() {

    var input;

    beforeEach(function() {
        input = new ZZ.Components.EligibleTextarea('label', 'placeholder', 'field');
        this.addMatchers(CUORE.Matchers);
    });

    it('returns the options', function() {
        input.setValue({
            optionA: 'textA',
            optionB: 'textB'
        });

        expect(input.getOptions()).toEqual(['optionA', 'optionB']);
    });

    it('returns the text for an option', function() {
        input.setValue({
            optionA: 'textA',
            optionB: 'textB'
        });

        expect(input.getTextForOption('optionB')).toEqual('textB');
    });

    it('returns the text for an option', function() {
        input.setValue({
            optionA: 'textA',
            optionB: 'textB'
        });


        expect(input.getTextForOption('optionB')).toEqual('textB');
    });


    it('returns the text for an option', function() {
        input.setValue({
            optionA: 'textA',
            optionB: 'textB'
        });

        spyOn(input, 'setValue');
        input.updateOption('optionB', 'the new text')

        expect(input.getTextForOption('optionB')).toEqual('the new text');

        expect(input.setValue).toHaveBeenCalledWith({
            optionA: 'textA',
            optionB: 'the new text'
        });
    });

    it('loads labels for every option', function() {
        spyOn(input, 'setI18NKey');

        input.setValue({
            optionA: 'textA',
            optionB: 'textB'
        });

        expect(input.setI18NKey).toHaveBeenCalledWith('zizerones.language.optionA');
        expect(input.setI18NKey).toHaveBeenCalledWith('zizerones.language.optionB');
    });
});