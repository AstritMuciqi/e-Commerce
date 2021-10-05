using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.ContactForms
{
    public class DeleteContactForm
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var contactform = await _context.ContactForm.FindAsync(request.Id);

                if (contactform == null)
                    throw new RestException(HttpStatusCode.NotFound, new { contactform = "Not found" });

                _context.Remove(contactform);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }

        }
    }
}