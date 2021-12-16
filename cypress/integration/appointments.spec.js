describe("Appointments", () => {
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
 
   cy.visit("/");
 
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
    //Deletes original appointment so that a new one can be created
    cy.get("[alt=Delete]")
    .click({ force: true })
    
    cy.contains("Confirm")
    .should('be.visible')
    .click({ force: true })
    //End of Original appointment deletion

   cy.get("[alt=Add]")
   .should('be.visible')
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
 
   cy.contains("Save").click();
 
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it('Should edit an interview', () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true })

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    
    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("Should cancel an interview", () => {
    //Repeats stes from 'should book an interview' until we're about to save'
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true })
    
    cy.contains("Confirm")
    .should('be.visible')
    .click({ force: true })

   cy.get("[alt=Add]")
   .should('be.visible')
    .first()
    .click();
 
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
   //End of 'should book an interview'
   cy.contains("Cancel").click();

   cy.contains(".appointment__card--show", "Lydia Miller-Jones").should('not.exist');
   cy.contains(".appointment__card--show", "Tori Malcolm").should('not.exist');
  })

  it("Should visit the root of our webserver", () => {

  })

  it("Should click the delete button", () => {
    cy.get("[alt=Delete]")
      .click({ force: true })
    
    cy.contains("Confirm")
      .should('be.visible')
  })

  it("Should click the confirm button", () => {
    cy.get("[alt=Delete]")
      .click({ force: true })
    
    cy.contains("Confirm")
      .should('be.visible')
      .click({ force: true })

    cy.get("[alt=Add]")
      .should('be.visible')
  })

  it("Should that see the appointment slot is empty", () => {
    cy.get("[alt=Delete]")
      .click({ force: true })
    
    cy.contains("Confirm")
      .should('be.visible')
      .click({ force: true })

    cy.contains("Deleting...")
      .should('be.visible')

    cy.contains("Deleting...")
      .should('not.exist')

      cy.contains(".appointment__card--show", "Archie Cohen")
        .should('not.exist')


  })
 });