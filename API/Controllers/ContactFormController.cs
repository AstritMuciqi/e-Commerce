
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ContactForms;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactFormController : ControllerBase
    {
       private readonly IMediator _mediator;

        public ContactFormController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        
        public async Task<ActionResult<List<ContactForm>>> List()
        {
           return await _mediator.Send(new ContactFormList.Query()); 
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<ContactForm>> ContactFormDetails(Guid id)
        {
            return await _mediator.Send(new ContactFormDetails.Query{Id=id});
        }

        [HttpPost]

        public async Task<ActionResult<Unit>> CreateContactForm(CreateContactForm.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditContactForm(Guid id,EditContactForm.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteContactForm(Guid id)
        {
            return await _mediator.Send(new DeleteContactForm.Command{Id=id});
        }
    }
}

