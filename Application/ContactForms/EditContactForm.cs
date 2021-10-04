using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ContactForms
{
    public class EditContactForm
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string FirstName { get; set; }

            public string LastName { get; set; }
            public string Email { get; set; }

            public string Message { get; set; }



        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.Message).NotEmpty();
            }
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

                contactform.FirstName = request.FirstName ?? contactform.FirstName;
                contactform.LastName = request.LastName ?? contactform.LastName;
                contactform.Email = request.Email ?? contactform.Email;
                contactform.Message = request.Message ?? contactform.Message;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem with saving data");
            }
        }
    }
}