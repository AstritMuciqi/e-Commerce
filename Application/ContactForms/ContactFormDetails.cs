using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.ContactForms
{
    public class ContactFormDetails
    {
        public class Query : IRequest<ContactForm>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ContactForm>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<ContactForm> Handle(Query request, CancellationToken cancellationToken)
            {
                var contactform = await _context.ContactForm.FindAsync(request.Id);
                if (contactform == null)
                    throw new RestException(HttpStatusCode.NotFound, new { contactform = "Not found" });
                
                return contactform;
            }
        }

    }
}