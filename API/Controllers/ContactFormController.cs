using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ContactForms;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactFormController : BaseController
    {
       
        
        [HttpGet]
        
        public async Task<ActionResult<List<ContactForm>>> List()
        {
           return await Mediator.Send(new ContactFormList.Query()); 
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ContactForm>> ContactFormDetails(Guid id)
        {
            return await Mediator.Send(new ContactFormDetails.Query{Id=id});
        }

        [HttpPost]

        public async Task<ActionResult<Unit>> CreateContactForm(CreateContactForm.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditContactForm(Guid id,EditContactForm.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteContactForm(Guid id)
        {
            return await Mediator.Send(new DeleteContactForm.Command{Id=id});
        }
    }
}

